import React, { useState } from 'react';

function CheckboxTodo({completed}) {
  const [isChecked, setIsChecked] = useState(completed);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        ref={isChecked}
      />
      <label htmlFor="checkbox">もう終わった？</label>
    </div>
  );
}

export default CheckboxTodo;