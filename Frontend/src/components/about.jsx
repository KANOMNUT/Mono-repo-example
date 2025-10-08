'use client'
import React, { useState } from 'react'
import { BsLinkedin } from 'react-icons/bs'
import { FaDownload, FaGitlab } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'
import { BiSolidPhoneCall } from 'react-icons/bi'

// Constants
const CONTACT_INFO = {
  mobile: "+6683-990-7607",
  email: "thanachai.tre@gmail.com"
}

const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/thanachai-t-bb2622208/",
  gitlab: "https://gitlab.com/thanachai.tre/",
  resume: "https://stseakanomnutt.blob.core.windows.net/portfolio/ThanachaiT-Resume.pdf"
}

// Modal Component
const ContactModal = ({ id, title, content, onCopy, isCopied, onClose }) => (
  <dialog id={id} className="modal modal-middle sm:modal-middle">
    <div className="modal-box text-black bg-slate-100">
      <h3 className="font-mono font-semibold text-2xl">{title}</h3>
      <div className="sm:flex sm:flex-col sm:justify-center sm:gap-2">
        <p className="py-4 px-4 font-mono text-lg sm:text-xl">{content}</p>
      </div>
      <div className="modal-action">
        <form method="dialog">
          <button 
            className="btn bg-slate-300 text-black hover:text-white hover:bg-zinc-800" 
            onClick={onClose}
          >
            Close
          </button>
        </form>
      </div>
      <div className='text-lg py-2 items-center px-2 absolute bottom-4 left-4'>
        {isCopied ? (
          <span className="btn bg-slate-300 text-black sm:hover:text-white sm:visible invisible">
            Copied
          </span>
        ) : (
          <button
            className="btn bg-slate-100 text-black hover:text-white sm:visible invisible"
            onClick={onCopy}
          >
            Copy
          </button>
        )}
      </div>
    </div>
  </dialog>
)

// Social Link Component
const SocialLink = ({ href, children, className = "" }) => (
  <a 
    target='_blank' 
    rel="noopener noreferrer"
    className={`flex p-4 hover:text-gray-950 items-center gap-2 rounded-full hover:scale-[1.15] active:scale-105 transition cursor-pointer ${className}`}
    href={href}
  >
    {children}
  </a>
)

// Contact Button Component
const ContactButton = ({ onClick, children }) => (
  <button 
    className="flex p-4 hover:text-gray-950 items-center gap-2 rounded-full hover:scale-[1.15] active:scale-105 transition cursor-pointer"
    onClick={onClick}
  >
    {children}
  </button>
)

const About = () => {
  const [copiedField, setCopiedField] = useState(null)

  const handleCopyToClipboard = async (text, fieldName) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(fieldName)
      // Reset copied state after 2 seconds
      setTimeout(() => setCopiedField(null), 2000)
    } catch (error) {
      console.error('Error copying text:', error)
    }
  }

  const handleCloseModal = () => {
    setCopiedField(null)
  }

  const openModal = (modalId) => {
    document.getElementById(modalId).showModal()
  }

  return (
    <section id='about' className="mb-25 text-center sm:mb-25 text-black font-mono">
      <h2 className="text-3xl mb-5 mt-7 text-center font-mono">About Me</h2>
      
      <div className="flex flex-col items-center justify-center font-mono">
        <div className="mb-5 mt-4 sm:mb-5 sm:mt-5 px-4 font-medium">
          <h1 className='text-2xl sm:text-2xl font-bold mb-2'>
            Hello, I'm Thanachai (Nut)
          </h1>
          <div className='text-lg sm:text-xl space-y-1'>
            <p>Cloud DevOps Engineer with 3 years of hands-on experience</p>
            <p>managing Azure Hybrid Cloud infrastructure, Google Cloud infrastructure</p>
            <p>and building DevSecOps CI/CD pipelines for Kubernetes-based deployments.</p>
            <p>I enjoy streamlining processes through automation, improving observability with effective monitoring,</p>
            <p>and constantly fine-tuning cloud environments to boost performance and reliability.</p>
            <p>I'm passionate about solving problems and helping teams move faster and more confidently in the cloud.</p>
          </div>
        </div>

        <div className='flex gap-2 flex-wrap justify-center'>
          {/* Email Contact */}
          <ContactButton onClick={() => openModal('email')}>
            <SiGmail className='text-3xl' />
          </ContactButton>
          
          <ContactModal
            id="email"
            title="EMAIL ADDRESS"
            content={CONTACT_INFO.email}
            onCopy={() => handleCopyToClipboard(CONTACT_INFO.email, 'email')}
            isCopied={copiedField === 'email'}
            onClose={handleCloseModal}
          />

          {/* Mobile Contact */}
          <ContactButton onClick={() => openModal('mobile_phone')}>
            <BiSolidPhoneCall className='text-3xl' />
          </ContactButton>
          
          <ContactModal
            id="mobile_phone"
            title="MOBILE NUMBER"
            content={CONTACT_INFO.mobile}
            onCopy={() => handleCopyToClipboard(CONTACT_INFO.mobile, 'mobile')}
            isCopied={copiedField === 'mobile'}
            onClose={handleCloseModal}
          />

          {/* Social Links */}
          <SocialLink href={SOCIAL_LINKS.linkedin}>
            <BsLinkedin className='text-3xl' />
          </SocialLink>

          <SocialLink href={SOCIAL_LINKS.gitlab}>
            <FaGitlab className='text-4xl' />
          </SocialLink>

          {/* Resume Download */}
          <SocialLink 
            href={SOCIAL_LINKS.resume}
            className="group bg-white ml-2 px-4 py-5 sm:py-2"
          >
            <span className='flex font-mono text-lg'>
              My Resume <FaDownload className='text-xl ml-2' />
            </span>
          </SocialLink>
        </div>
      </div>
    </section>
  )
}

export default About
