import React from 'react'

function Footer() {
    const fullYear = new Date().getFullYear()
  return (
    <footer className='footer p-10 bg-gray-700 footer-center text-primary-content'>
    <p>Copyright &copy; {fullYear} all rights reserved</p>

    </footer>
  )
}

export default Footer;