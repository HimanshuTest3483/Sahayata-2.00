import React from 'react';
import { DollarSign, FileText, ExternalLink } from 'lucide-react';

const FinancialResources = () => {
  const resources = [
    {
      category: 'Government Assistance',
      items: [
        {
          title: 'Medicare Benefits',
          description: 'Information about Medicare coverage and benefits for caretakers.',
          link: '#'
        },
        {
          title: 'Social Security Benefits',
          description: 'Learn about available social security benefits and eligibility.',
          link: '#'
        }
      ]
    },
    {
      category: 'Grants & Financial Aid',
      items: [
        {
          title: 'Caretaker Support Grants',
          description: 'Various grant opportunities available for caretakers.',
          link: '#'
        },
        {
          title: 'Medical Equipment Assistance',
          description: 'Programs helping with medical equipment costs.',
          link: '#'
        }
      ]
    },
    {
      category: 'Tax Benefits',
      items: [
        {
          title: 'Tax Deductions Guide',
          description: 'Comprehensive guide to tax deductions for caretakers.',
          link: '#'
        },
        {
          title: 'Healthcare Expense Credits',
          description: 'Information about healthcare-related tax credits.',
          link: '#'
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <DollarSign className="h-8 w-8 text-primary-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Financial Resources</h1>
        </div>

        <div className="mb-8">
          <div className="bg-primary-50 border-l-4 border-primary-600 p-4 rounded">
            <h2 className="text-lg font-semibold text-primary-900 mb-2">Financial Support Overview</h2>
            <p className="text-primary-800">
              Explore various financial resources and support programs available to caretakers. These resources can help manage healthcare costs, daily expenses, and long-term care planning.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {resources.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FileText className="h-5 w-5 text-primary-600 mr-2" />
                {section.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <a
                      href={item.link}
                      className="inline-flex items-center text-primary-600 hover:text-primary-700"
                    >
                      Learn More
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Need Financial Advice?</h2>
          <p className="text-gray-600 mb-4">
            Connect with our financial advisors who specialize in caretaker financial planning and support.
          </p>
          <button className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors">
            Schedule Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinancialResources;