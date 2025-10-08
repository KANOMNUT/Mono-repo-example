package com.example.demo.security;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.regex.Pattern;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class SecurityFilter implements Filter {

    private static final Pattern SQL_INJECTION_PATTERN = 
        Pattern.compile(".*[;'].*|.*--.*|.*drop\\s+.*|.*select\\s+.*", Pattern.CASE_INSENSITIVE);
    
    private static final Pattern XSS_PATTERN = 
        Pattern.compile(".*<script>.*|.*</script>.*|.*javascript:.*|.*onerror=.*|.*onload=.*", 
                      Pattern.CASE_INSENSITIVE);

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // Add security headers
        httpResponse.setHeader("X-Content-Type-Options", "nosniff");
        httpResponse.setHeader("X-Frame-Options", "DENY");
        httpResponse.setHeader("X-XSS-Protection", "1; mode=block");
        httpResponse.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
        httpResponse.setHeader("Pragma", "no-cache");

        // Check for potential SQL injection
        if (containsSQLInjection(httpRequest)) {
            httpResponse.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid request");
            return;
        }

        // Check for potential XSS
        if (containsXSS(httpRequest)) {
            httpResponse.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid request");
            return;
        }

        chain.doFilter(request, response);
    }

    private boolean containsSQLInjection(HttpServletRequest request) {
        String queryString = request.getQueryString();
        if (queryString != null && SQL_INJECTION_PATTERN.matcher(queryString).matches()) {
            return true;
        }
        return false;
    }

    private boolean containsXSS(HttpServletRequest request) {
        String queryString = request.getQueryString();
        if (queryString != null && XSS_PATTERN.matcher(queryString).matches()) {
            return true;
        }
        return false;
    }
}