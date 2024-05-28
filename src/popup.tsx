import React from 'react';
import ReactDOM from 'react-dom';

const styles = {
  container: {
    minWidth: '300px',
    textAlign: 'center',
  } as React.CSSProperties,
};

const Popup = () => {
  return (
    <div style={styles.container}>
      <h3>TruckerPath Maps Extension</h3>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<Popup />, rootElement);
