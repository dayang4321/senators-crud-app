import React from 'react';

import './SenatorsList.css';

const SentorList = React.memo(props => {
  let senateList = <p>Add senators!</p>;
;
  if (props.senators) {  senateList = props.senators.map(senator => (
    <li key={senator.id}
      onClick={props.onRemoveItem.bind(this, senator.id)}
    >
      <p>{'Senator ' + senator.name + ' of ' + senator.state + ' ' + senator.constituency}</p>
    </li>
  ))}
  return (
    <section className="senators-list">
      <h2>Your senators</h2>
      <ul>
        {senateList}
      </ul>
    </section>
  );
})

export default SentorList;
