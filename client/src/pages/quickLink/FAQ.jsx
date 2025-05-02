import React, { useState } from 'react';

const faqs = [
  {
    question: 'How do I create an account on your platform?',
    answer: `To create an account, click on the "Sign Up" button at the top-right corner of the homepage. You will be asked to enter your email address, create a password, and provide basic personal information such as your name and phone number. After completing the registration, you will receive a confirmation email to verify your account.`
  },
  {
    question: 'What payment methods do you accept?',
    answer: `We accept major credit and debit cards including Visa, Mastercard, and American Express. You can also pay via PayPal, Apple Pay, or direct bank transfers. All payment information is securely encrypted and processed through trusted payment gateways.`
  },
  {
    question: 'Can I modify or cancel my order after placing it?',
    answer: `Yes, you can modify or cancel your order within 1 hour after placing it, as long as it has not been processed for shipping. To do this, go to the "My Orders" section under your account and click "Edit" or "Cancel" next to the respective order. If the order has already been shipped, you will need to follow the return process.`
  },
  {
    question: 'What is your return and refund policy?',
    answer: `We offer a 30-day return policy on all eligible items. Items must be in their original condition with tags and packaging intact. To initiate a return, log into your account, go to "Order History", and click on "Request Return". Once the return is approved and the product is received, your refund will be processed within 5–7 business days.`
  },
  {
    question: 'How do you ensure data privacy and customer information security?',
    answer: `We are fully committed to protecting your privacy. All user data is encrypted during transmission using SSL and stored in secure databases. We do not share, sell, or lease any personal information to third parties. For more details, please review our Privacy Policy page.`
  },
  {
    question: 'Do you offer support for bulk or wholesale orders?',
    answer: `Yes, we do offer bulk and wholesale pricing for businesses or large quantity purchases. You can contact our B2B Sales Team through the "Wholesale Inquiry" form or email us at b2b@example.com for a customized quote.`
  },
  {
    question: 'What should I do if my product arrives damaged or defective?',
    answer: `If your product is damaged or defective upon arrival, please contact our support team within 48 hours of delivery. Provide photos of the product and packaging, and we will assist with a replacement or full refund depending on the situation.`
  }
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto text-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-center text-[#FFA50B]">Frequently Asked Questions</h1>
      <div className="space-y-5">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-300 rounded-lg shadow-sm">
            <button
              onClick={() => toggle(index)}
              className="w-full text-left px-6 py-4 flex justify-between items-center text-lg font-medium bg-gray-100 hover:bg-gray-200 transition"
            >
              {faq.question}
              <span className="text-2xl">{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-white text-gray-700 leading-relaxed border-t">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
