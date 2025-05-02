import React from 'react';

const TermsOfUse = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto text-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-[#FFA50B] text-center">TERMS OF USE</h2>
      <p className="mb-6">
        By accessing and using our website, you agree to comply with and be bound by the following terms and conditions.
        Please read them carefully.
      </p>

      {/* Section 1 */}
      <h2 className="font-bold mb-2">1. USE OF WEBSITE</h2>
      <ul className="list-disc list-inside mb-6">
        <li>You must be at least 18 years old to use this site.</li>
        <li>You agree not to use the website for any illegal or unauthorized purpose.</li>
        <li>You must not interfere with or disrupt the site's security or functionality.</li>
      </ul>

      {/* Section 2 */}
      <h2 className="font-bold mb-2">2. ACCOUNT RESPONSIBILITY</h2>
      <ul className="list-disc list-inside mb-6">
        <li>You are responsible for maintaining the confidentiality of your account and password.</li>
        <li>You agree to accept responsibility for all activities that occur under your account.</li>
      </ul>

      {/* Section 3 */}
      <h2 className="font-bold mb-2">3. INTELLECTUAL PROPERTY</h2>
      <ul className="list-disc list-inside mb-6">
        <li>All content on this website is the property of our company or its licensors.</li>
        <li>You may not reproduce, distribute, or exploit any content without our prior written consent.</li>
      </ul>

      {/* Section 4 */}
      <h2 className="font-bold mb-2">4. LIMITATION OF LIABILITY</h2>
      <p className="mb-6">
        We shall not be liable for any damages resulting from the use or inability to use the website,
        including but not limited to indirect, incidental, or consequential damages.
      </p>

      {/* Section 5 */}
      <h2 className="font-bold mb-2">5. MODIFICATIONS TO TERMS</h2>
      <p className="mb-6">
        We reserve the right to update or modify these terms at any time. Continued use of the site after changes
        indicates your acceptance of the new terms.
      </p>

      {/* Section 6 */}
      <h2 className="font-bold mb-2">6. CONTACT US</h2>
      <p>
        If you have any questions about these Terms of Use, please contact us at 
        <span className="text-gray-600"> [email/phone number]</span>.
      </p>
    </div>
  );
};

export default TermsOfUse;