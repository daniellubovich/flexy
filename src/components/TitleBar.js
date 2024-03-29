import { html } from 'htm/preact'
import { Component } from 'preact'

export default class TitleBar extends Component {
  render({ title = 'Title' }) {
    return html` <h1 class="title-bar">${title}</h1> `
  }
}
