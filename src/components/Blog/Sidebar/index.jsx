import React from 'react';
import './styles.css';

const Sidebar = ({ headings, activeHeading }) => {
  const h3Elements = document.querySelectorAll('h3');

  h3Elements.forEach(function (h3Element) {
    const h3TextContent = h3Element.textContent;
    h3Element.textContent = h3TextContent;
  });

  const sections = Array.from(h3Elements).map((item) =>
    item.innerHTML
      .toLowerCase()
      .replaceAll(' ', '-')
      .replaceAll(',', '')
      .replaceAll('--', '-')
      .replaceAll('/', '-')
  );

  return (
    <div className='sidebar'>
      <ul>
        {headings.map((heading, index) => {
          const classNames = sections;

          return (
            <li
              key={index}
              className={activeHeading === classNames[index] ? 'active' : ''}
            >
              <a href={`#${classNames[index]}`}>{heading}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
