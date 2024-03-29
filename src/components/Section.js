// Section.js
import { html } from 'htm/preact'
import { Component } from 'preact'

export default class Section extends Component {
  render({ title = 'Section', children = 'Section Content' }) {
    return html`
      <section class="section">
        ${title === 'Section' ? '' : html`<h2>${title}</h2>`} ${children}
      </section>
    `
  }
}
