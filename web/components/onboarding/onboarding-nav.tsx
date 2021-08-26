
import React from 'react';
import { CheckIcon } from '@heroicons/react/solid';
import { classNames } from '@common/class-names';

const currentSection = 0;

const getSectionStatus = (currentSection, navSection) => {
  if (currentSection > navSection) return "complete";
  if (currentSection === navSection) return "current";
  return "upcoming";
};

export const OnboardingNav = () => { 
  const onboardingSections = [
    { 
      id: '01',
      name: 'Swap',
      description: 'Exchange your favorite tokens easily.',
      href: '/onboarding/step-1-swap',
      status: getSectionStatus(currentSection, 1),
    },
    { 
      id: '02',
      name: 'Vaults',
      description: 'Deposit STX and generate USDA.',
      href: '/onboarding/step-2-vaults',
      status: getSectionStatus(currentSection, 2),
    },
    { 
      id: '03',
      name: 'Staking',
      description: 'Stake your tokens to earn rewards.',
      href: '#',
      status: getSectionStatus(currentSection, 3),
    },
    { 
      id: '04',
      name: 'Governance',
      description: 'Vote on proposals.',
      href: '#',
      status: getSectionStatus(currentSection, 4),
    },
  ]
  
  return (
    <div className="lg:border-t lg:border-b lg:border-gray-200">
      <nav className="bg-white" aria-label="Onboarding Progress">
        <ol
          role="list"
          className="overflow-hidden lg:flex lg:border-l lg:border-r lg:border-gray-200"
        >
          {onboardingSections.map((section, sectionIdx) => (
            <li key={section.id} className="relative overflow-hidden lg:flex-1">
              <div
                className={classNames(
                  sectionIdx === 0 ? 'border-b-0' : '',
                  sectionIdx === onboardingSections.length - 1 ? 'border-t-0' : '',
                  'border border-gray-200 overflow-hidden lg:border-0'
                )}
              >
                {section.status === 'complete' ? (
                  <a href={section.href} className="group">
                    <span
                      className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-gray-200 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto"
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        sectionIdx !== 0 ? 'lg:pl-9' : '',
                        'px-6 py-5 flex items-start text-sm font-medium'
                      )}
                    >
                      <span className="flex-shrink-0">
                        <span className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-full">
                          <CheckIcon className="w-6 h-6 text-white" aria-hidden="true" />
                        </span>
                      </span>
                      <span className="mt-0.5 ml-4 min-w-0 flex flex-col">
                        <span className="text-base font-headings">{section.name}</span>
                        <span className="text-sm font-medium text-gray-500">{section.description}</span>
                      </span>
                    </span>
                  </a>
                ) : section.status === 'current' ? (
                  <a href={section.href} aria-current="section">
                    <span
                      className="absolute top-0 left-0 w-1 h-full bg-indigo-600 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto"
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        sectionIdx !== 0 ? 'lg:pl-9' : '',
                        'px-6 py-5 flex items-start text-sm font-medium'
                      )}
                    >
                      <span className="flex-shrink-0">
                        <span className="flex items-center justify-center w-10 h-10 border-2 border-indigo-600 rounded-full">
                          <span className="text-indigo-600">{section.id}</span>
                        </span>
                      </span>
                      <span className="mt-0.5 ml-4 min-w-0 flex flex-col">
                        <span className="text-base text-indigo-600 font-headings">
                          {section.name}
                        </span>
                        <span className="text-sm font-medium text-gray-500">{section.description}</span>
                      </span>
                    </span>
                  </a>
                ) : (
                  <a href={section.href} className="group">
                    <span
                      className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-gray-200 lg:w-full lg:h-1 lg:bottom-0 lg:top-auto"
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        sectionIdx !== 0 ? 'lg:pl-9' : '',
                        'px-6 py-5 flex items-start text-sm font-medium'
                      )}
                    >
                      <span className="flex-shrink-0">
                        <span className="flex items-center justify-center w-10 h-10 border-2 border-gray-300 rounded-full">
                          <span className="text-gray-500">{section.id}</span>
                        </span>
                      </span>
                      <span className="mt-0.5 ml-4 min-w-0 flex flex-col">
                        <span className="text-base text-gray-500 font-headings">{section.name}</span>
                        <span className="text-sm font-medium text-gray-500">{section.description}</span>
                      </span>
                    </span>
                  </a>
                )}

                {sectionIdx !== 0 ? (
                  <>
                    {/* Separator */}
                    <div className="absolute inset-0 top-0 left-0 hidden w-3 lg:block" aria-hidden="true">
                      <svg
                        className="w-full h-full text-gray-300"
                        viewBox="0 0 12 82"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor" vectorEffect="non-scaling-stroke" />
                      </svg>
                    </div>
                  </>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};
