import React from 'react';

export const TestComponent = ({ name }: { name: string }) => {
  console.log('test');
  return (
    <div>
      <h1>Hello, {name}\!</h1>
    </div>
  );
};
// Additional test comment
