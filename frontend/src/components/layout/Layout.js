import React from 'react'
import styles from './Layout.module.css'
function Layout() {
  return (
    <div className={styles.background}>
      <h1>Hello, React!</h1>
      <p>This is a basic functional component.</p>
    </div>
  );
}
  
export default Layout;