"use client"
import React from 'react';
import { Github, Linkedin, Code, Clock, Mail } from 'lucide-react'; 

const Footer = () => {
    // Defines a vibrant, modern color palette for links (Text size remains text-sm)
    const linkClasses = "text-gray-600 text-sm hover:text-indigo-600 hover:font-medium transition duration-300 ease-in-out block";
    
    const SocialIcon = ({ href, children, label }) => (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label={label} 
            className="text-gray-500 hover:text-indigo-600 transition duration-300"
        >
            {children}
        </a>
    );

    return (

        <footer className="bg-gray-50 py-8 border-t border-gray-200 shadow-inner"> {/* Increased vertical padding and lighter background */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Responsive horizontal padding */}
                

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-200"> {/* Increased gap for better spacing */}


                    {/* 1. Developer Section (Logo and Socials) */}
                    <div className="text-center md:text-left md:col-span-1">
                        <div className="text-3xl font-extrabold text-indigo-700 mb-2">
                            Interviewer
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                            AI-powered interviews, smarter for recruiters and candidates.
                        </p>
                        
                        <h4 className="text-lg font-bold text-gray-800 mb-2 uppercase tracking-wider">
                            Developer
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                            API, technical inquiries, and collaboration.
                        </p>
                        
                        {/* Developer Social Links: Center on mobile, left-align on desktop */}
                        <div className="flex justify-center md:justify-start space-x-4 mt-3">
                            <SocialIcon href="https://github.com/himanshu561hi" label="GitHub Profile">
                                <Github className="w-6 h-6" /> {/* Slightly larger icons */}
                            </SocialIcon>

                            <SocialIcon href="https://linkedin.com/in/himanshu561hi" label="LinkedIn Profile">
                                <Linkedin className="w-6 h-6" />
                            </SocialIcon>
                            
                            <SocialIcon href="https://himanshu561hi.netlify.app/" label="Portfolio Website">
                                <Code className="w-6 h-6" />
                            </SocialIcon>

                            <SocialIcon href="https://wakatime.com/@himanshu561hi" label="WakaTime Coding Activity">
                                <Clock className="w-6 h-6" />
                            </SocialIcon>
                            
                            <SocialIcon href="mailto:himanshu561hi@gmail.com" label="Developer Email">
                                <Mail className="w-6 h-6" />
                            </SocialIcon>
                        </div>
                    </div>

                    {/* 2. Platform & Company */}
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wider mt-4 md:mt-0"> {/* Adjusted margin for mobile stacking */}
                            Platform & Company
                        </h4>
                        <ul className="space-y-2"> {/* Increased vertical spacing slightly */}
                            <li><a href="#features" className={linkClasses}>AI Features</a></li>
                            <li><a href="#pricing" className={linkClasses}>Pricing Plans</a></li>
                            <li><a href="#about" className={linkClasses}>About Us</a></li>
                            <li><a href="#careers" className={linkClasses}>Careers</a></li>
                            <li><a href="#blog" className={linkClasses}>AI Blog</a></li>
                        </ul>
                    </div>
                    
                    {/* 3. Support & Legal */}
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wider mt-4 md:mt-0"> {/* Adjusted margin for mobile stacking */}
                            Support & Legal
                        </h4>
                        <ul className="space-y-2"> {/* Increased vertical spacing slightly */}
                            <li><a href="#contact" className={linkClasses}>Contact Support</a></li>
                            <li><a href="#faq" className={linkClasses}>FAQ / Help Center</a></li>
                            <li><a href="#privacy" className={linkClasses}>Privacy Policy</a></li>
                            <li><a href="#terms" className={linkClasses}>Terms of Service</a></li>
                            <li><a href="#api" className={linkClasses}>View API Docs</a></li> 
                        </ul>
                    </div>

                </div>

                {/* Footer Bottom / Copyright and Signature */}
                <div className="pt-4 flex flex-col items-center text-sm text-gray-500"> {/* Centered content */}
                    <p className="order-2 mt-3 md:mt-0 text-gray-500">
                        &copy; {new Date().getFullYear()} Interviewer. All rights reserved. 
                    </p>
                
                    {/* Signature */}
                    <div className="order-1 md:order-2 text-center text-sm text-gray-600">
                        Made with <span className="text-red-500">❤️</span> by <b>Himanshu</b>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
