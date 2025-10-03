// src/components/Footer.jsx

import React from 'react';
// IMPORT ICONS HERE from lucide-react
import { Github, Linkedin, Twitter } from 'lucide-react'; 

const Footer = () => {
    // Defines a vibrant, modern color palette for links
    const linkClasses = "text-gray-600 hover:text-indigo-600 hover:font-medium transition duration-300 ease-in-out";
    
    // Reusable Social Icon component is simplified since Lucide handles the SVG
    const SocialIcon = ({ href, children, label }) => (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label={label} 
            className="text-gray-500 hover:text-indigo-600 transition duration-300"
        >
            {/* The icon component is passed as children */}
            {children}
        </a>
    );

    return (
        <footer className="bg-gray-200 py-12 border-t border-gray-300 shadow-inner">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                
                {/* Footer Content Grid - 3 columns on medium/large screens */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-10 border-b border-gray-300">

                    {/* 1. Branding & Developer Hub */}
                    <div className="text-center md:text-left md:col-span-1">
                        <div className="text-3xl font-extrabold text-indigo-700 mb-2">
                            Interviewer
                        </div>
                        <p className="text-sm text-gray-500 mb-6">
                            The intelligent path to your next hire.
                        </p>
                        
                        <h4 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wider">
                            Developer
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                            API, technical inquiries, and collaboration.
                        </p>
                        
                        {/* Developer Social Links */}
                        <div className="flex justify-center md:justify-start space-x-4">
                            {/* GitHub Icon (using Lucide component) */}
                            <SocialIcon href="https://github.com/ai-recruit-dev" label="GitHub Profile">
                                <Github className="w-6 h-6" />
                            </SocialIcon>

                            {/* LinkedIn Icon (using Lucide component) */}
                            <SocialIcon href="https://linkedin.com/in/ai-recruit-lead-dev" label="LinkedIn Profile">
                                <Linkedin className="w-6 h-6" />
                            </SocialIcon>

                            {/* Twitter/X Icon (using Lucide component) */}
                            <SocialIcon href="#twitter" label="Twitter/X Profile">
                                <Twitter className="w-6 h-6" />
                            </SocialIcon>
                        </div>
                    </div>

                    {/* 2. Platform & Company */}
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wider">
                            Platform & Company
                        </h4>
                        <ul className="space-y-3">
                            <li><a href="#features" className={linkClasses}>AI Features</a></li>
                            <li><a href="#pricing" className={linkClasses}>Pricing Plans</a></li>
                            <li><a href="#about" className={linkClasses}>About Us</a></li>
                            <li><a href="#careers" className={linkClasses}>Careers</a></li>
                            <li><a href="#blog" className={linkClasses}>AI Blog</a></li>
                        </ul>
                    </div>
                    
                    {/* 3. Support & Legal */}
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wider">
                            Support & Legal
                        </h4>
                        <ul className="space-y-3">
                            <li><a href="#contact" className={linkClasses}>Contact Support</a></li>
                            <li><a href="#faq" className={linkClasses}>FAQ / Help Center</a></li>
                            <li><a href="#privacy" className={linkClasses}>Privacy Policy</a></li>
                            <li><a href="#terms" className={linkClasses}>Terms of Service</a></li>
                            <li><a href="#api" className={linkClasses}>View API Docs</a></li> 
                        </ul>
                    </div>

                </div>

                {/* Footer Bottom / Copyright */}
                <div className="pt-6 flex flex-col md:flex-row justify-center items-center text-sm text-gray-500">
                    <p className="order-2 md:order-1">
                        &copy; {new Date().getFullYear()} AI Recruit. All rights reserved. 
                    </p>
                </div>

                {/* Signature on Next Line */}
                <div className="text-center text-sm text-gray-600 mt-4">
                    Made with <span className="text-red-500">❤️</span> by **Himanshu**
                </div>
            </div>
        </footer>
    );
};

export default Footer;