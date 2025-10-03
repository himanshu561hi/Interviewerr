import React from 'react';
import { Github, Linkedin, Code, Clock, Mail } from 'lucide-react'; 

const Footer = () => {
    // Defines a vibrant, modern color palette for links (Text size remains text-sm)
    const linkClasses = "text-gray-600 text-sm hover:text-indigo-600 hover:font-medium transition duration-300 ease-in-out";
    
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

        <footer className="bg-gray-200 py-6 border-t border-gray-300 shadow-inner">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-gray-300">


                    <div className="text-center md:text-left md:col-span-1">
                        <div className="text-3xl font-extrabold text-indigo-700 mb-1">

                            Interviewer
                        </div>
                        <p className="text-sm text-gray-500 mb-3">

                            AI-powered interviews, smarter for recruiters and candidates.
                        </p>
                        
                        <h4 className="text-lg font-bold text-gray-800 mb-2 uppercase tracking-wider">
                            Developer
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                            API, technical inquiries, and collaboration.
                        </p>
                        
                        {/* Developer Social Links */}
                        <div className="flex justify-center md:justify-start space-x-3 mt-2">
                            {/* Margin Reduced: mt-3 -> mt-2 */}
                            <SocialIcon href="https://github.com/himanshu561hi" label="GitHub Profile">
                                <Github className="w-5 h-5" />
                            </SocialIcon>

                            <SocialIcon href="https://linkedin.com/in/himanshu561hi" label="LinkedIn Profile">
                                <Linkedin className="w-5 h-5" />
                            </SocialIcon>
                            
                            <SocialIcon href="https://himanshu561hi.netlify.app/" label="Portfolio Website">
                                <Code className="w-5 h-5" />
                            </SocialIcon>

                            <SocialIcon href="https://wakatime.com/@himanshu561hi" label="WakaTime Coding Activity">
                                <Clock className="w-5 h-5" />
                            </SocialIcon>
                            
                            <SocialIcon href="mailto:himanshu561hi@gmail.com" label="Developer Email">
                                <Mail className="w-5 h-5" />
                            </SocialIcon>
                        </div>
                    </div>

                    {/* 2. Platform & Company */}
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-bold text-gray-800 mb-2 uppercase tracking-wider">
                            {/* Margin Reduced: mb-4 -> mb-2 */}
                            Platform & Company
                        </h4>
                        <ul className="space-y-1">
                             {/* Spacing Reduced: space-y-3 -> space-y-1 (Very compact) */}
                            <li><a href="#features" className={linkClasses}>AI Features</a></li>
                            <li><a href="#pricing" className={linkClasses}>Pricing Plans</a></li>
                            <li><a href="#about" className={linkClasses}>About Us</a></li>
                            <li><a href="#careers" className={linkClasses}>Careers</a></li>
                            <li><a href="#blog" className={linkClasses}>AI Blog</a></li>
                        </ul>
                    </div>
                    
                    {/* 3. Support & Legal */}
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-bold text-gray-800 mb-2 uppercase tracking-wider">
                            {/* Margin Reduced: mb-4 -> mb-2 */}
                            Support & Legal
                        </h4>
                        <ul className="space-y-1">
                            {/* Spacing Reduced: space-y-3 -> space-y-1 (Very compact) */}
                            <li><a href="#contact" className={linkClasses}>Contact Support</a></li>
                            <li><a href="#faq" className={linkClasses}>FAQ / Help Center</a></li>
                            <li><a href="#privacy" className={linkClasses}>Privacy Policy</a></li>
                            <li><a href="#terms" className={linkClasses}>Terms of Service</a></li>
                            <li><a href="#api" className={linkClasses}>View API Docs</a></li> 
                        </ul>
                    </div>

                </div>

                {/* Footer Bottom / Copyright */}
                <div className="pt-2 flex flex-col md:flex-row justify-center items-center text-sm text-gray-500">
                    {/* Padding Reduced: pt-6 -> pt-2 */}
                    <p className="order-2 md:order-1 mt-2 md:mt-0">
                        {/* Margin Reduced: mt-4 -> mt-2 */}
                        &copy; {new Date().getFullYear()} Interviewer. All rights reserved. 
                    </p>
                </div>

                {/* Signature on Next Line */}
                <div className="text-center text-sm text-gray-600 mt-1">
                    {/* Margin Reduced: mt-1 (Already tight, but kept to ensure separation) */}
                    Made with <span className="text-red-500">❤️</span> by <b>Himanshu</b>
                </div>
            </div>
        </footer>
    );
};

export default Footer;