import React from 'react';
import { problems } from '../data/problems'; // Import your mock database

const BusinessProblems: React.FC = () => {
  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen py-32 lg:px-64 md:32">
        <h1 className="text-2xl font-bold mb-6">Business Problems</h1>
        {problems.map((problem) => (
          <article key={problem.id} className="p-6 text-base bg-white rounded-lg dark:bg-gray-900 mb-6">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                  <img
                    className="mr-2 w-6 h-6 rounded-full"
                    src={problem.profilePic}
                    alt={problem.author}
                  />
                  {problem.author}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <time dateTime={problem.date} title={problem.date}>
                    {new Date(problem.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </p>
              </div>
              <button
                id={`dropdownComment${problem.id}Button`}
                data-dropdown-toggle={`dropdownComment${problem.id}`}
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 3"
                >
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
                <span className="sr-only">Comment settings</span>
              </button>
              <div
                id={`dropdownComment${problem.id}`}
                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconHorizontalButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Remove
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Report
                    </a>
                  </li>
                </ul>
              </div>
            </footer>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{problem.title}</h2>
            <p className="text-gray-500 dark:text-gray-400">{problem.content}</p>
          </article>
        ))}
      </div>
    </>
  );
};

export default BusinessProblems;
