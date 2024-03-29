// Footer.js
import { html } from 'htm/preact'
import { Component } from 'preact'

export default class Footer extends Component {
  render({ page }) {
    return html`
      <footer class="footer">
        <p>Daniel Lubovich</p>
        <p>Boise, ID</p>
        <p>daniellubovich@gmail.com</p>
      </footer>
    `
  }
}
