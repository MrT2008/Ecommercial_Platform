import React, { useState } from 'react';

const PrivacyPolicy = () => {
    return (
      <div className="p-8 max-w-4xl mx-auto text-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-[#FFA50B] text-center">PRIVACY POLICY</h2>
        <p className="mb-6">
          We are committed to protecting your personal information when using our website. 
          This policy explains how we collect, use, and safeguard your data.
        </p>
  
        {/* Section 1 */}
        <h2 className="font-bold mb-2">1. INFORMATION WE COLLECT</h2>
        <p className="mb-2">When you use our website, we may collect the following information:</p>
        <ul className="list-disc list-inside mb-6">
          <li><strong>Personal Information:</strong> Name, phone number, email, shipping address, and payment details.</li>
          <li><strong>Transaction Information:</strong> Purchase history, order value, payment method.</li>
          <li><strong>Device Information:</strong> IP address, browser type, operating system, and browsing history on our site.</li>
        </ul>
  
        {/* Section 2 */}
        <h2 className="font-bold mb-2">2. HOW WE USE YOUR INFORMATION</h2>
        <p className="mb-2">We collect your information for the following purposes:</p>
        <ul className="list-disc list-inside mb-6">
          <li><strong>Order Processing:</strong> Delivering products, confirming payments, and issuing invoices.</li>
          <li><strong>Customer Support:</strong> Handling complaints and responding to inquiries.</li>
          <li><strong>Service Improvement:</strong> Enhancing the shopping experience and personalizing product recommendations.</li>
          <li><strong>Security & Legal Compliance:</strong> Preventing fraud and complying with legal obligations.</li>
        </ul>
  
        {/* Section 3 */}
        <h2 className="font-bold mb-2">3. DATA SECURITY</h2>
        <p className="mb-2">We are committed to protecting your personal data using appropriate security measures:</p>
        <ul className="list-disc list-inside mb-6">
          <li>Encrypting data during transmission.</li>
          <li>Restricting access to personal information.</li>
          <li>Never sharing, selling, or exchanging personal data with third parties without your consent, except when required by law.</li>
        </ul>
  
        {/* Section 4 */}
        <h2 className="font-bold mb-2">4. YOUR RIGHTS</h2>
        <p className="mb-2">You have the right to:</p>
        <ul className="list-disc list-inside mb-6">
          <li>Access and update your personal information at any time.</li>
          <li>Request deletion or restriction of your personal data.</li>
          <li>Opt out of marketing communications.</li>
        </ul>
        <p className="mb-6">
          To exercise these rights, please contact us at <span className="text-gray-600">[email/phone number]</span>.
        </p>
  
        {/* Section 5 */}
        <h2 className="font-bold mb-2">5. COOKIES & TRACKING TECHNOLOGIES</h2>
        <p className="mb-2">We use cookies to:</p>
        <ul className="list-disc list-inside mb-6">
          <li>Remember your login details.</li>
          <li>Personalize your shopping experience.</li>
          <li>Analyze user behavior to improve our services.</li>
        </ul>
        <p className="mb-6">
          You can manage or disable cookies through your browser settings.
        </p>
  
        {/* Section 6 */}
        <h2 className="font-bold mb-2">6. POLICY UPDATES</h2>
        <p>
          This policy may be updated to reflect changes in legal regulations or business needs. 
          Any changes will be announced on our website. For any questions, please contact us at 
          <span className="text-gray-600"> [email/phone number]</span>.
        </p>
      </div>
    );
  };
  
  export default PrivacyPolicy;