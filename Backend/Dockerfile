# Build stage
FROM maven:3.9-amazoncorretto-25 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src

# Build the application while skipping tests (tests can be run in CI pipeline)
RUN mvn clean package -DskipTests

# Runtime stage
FROM amazoncorretto:25-alpine
WORKDIR /app

# Create a non-root user for security
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy the jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Configure JVM options for containers
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"

# Set health check
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD curl -f http://localhost:8080/healthz || exit 1

# Expose application port
EXPOSE 8080

# Start the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]