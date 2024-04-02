// Footer.js
import { html } from 'htm/preact'
import { Component } from 'preact'

export default class Sandbox extends Component {
  constructor() {
    super()
    this.state = {
      flexClass: 'flex-row',
      wrap: 'flex-wrap',
      alignItems: 'align-items-stretch',
      gap: 4,
      itemCount: 0,
      items: [],
    }

    this.addItem()
    this.addItem()
    this.addItem()
  }

  updateIcon({ flexClass }) {
    this.setState({ flexClass })
  }

  addItem() {
    if (this.state.itemCount === 10) return
    this.state.itemCount++
    this.state.items.push({
      id: this.state.itemCount,
      order: 0,
      flex: '0 0 50px',
      alignSelf: 'auto',
    })
    this.setState({ items: this.state.items, itemCount: this.state.itemCount })
  }

  removeItem() {
    if (this.state.itemCount === 1) return
    this.state.itemCount--
    this.state.items.pop()
    this.setState({ items: this.state.items, itemCount: this.state.itemCount })
  }

  getFlexGrow(flexValue) {
    return flexValue.split(' ')[0]
  }

  getFlexShrink(flexValue) {
    return flexValue.split(' ')[1]
  }

  getFlexBasis(flexValue) {
    return flexValue.split(' ')[2]
  }

  setFlexGrow(i, value) {
    const item = this.state.items[Number(i) - 1]
    item.flex = `${value} ${this.getFlexShrink(item.flex)} ${this.getFlexBasis(
      item.flex
    )}`
    this.setState({ items: this.state.items })
  }

  setFlexShrink(i, value) {
    const item = this.state.items[Number(i) - 1]
    item.flex = `${this.getFlexGrow(item.flex)} ${value} ${this.getFlexBasis(
      item.flex
    )}`
    this.setState({ items: this.state.items })
  }

  setFlexBasis(i, value) {
    const item = this.state.items[Number(i) - 1]
    item.flex = `${this.getFlexGrow(item.flex)} ${this.getFlexShrink(
      item.flex
    )} ${value}`
    this.setState({ items: this.state.items })
  }

  getItems() {
    let items = []
    for (const item of this.state.items) {
      items.push(
        html`<div
          class="sandbox-item item-${item.id} align-self-${item.alignSelf}"
          style=${{ flex: item.flex, order: item.order }}
        >
          <span class="sandbox-item-name">${item.id}</span>
        </div>`
      )
    }
    return items
  }

  updateItem(id, key, value) {
    const item = this.state.items.find((item) => item.id === Number(id))
    item[key] = value
    this.setState({ items: this.state.items })
  }

  getItemsForEditor() {
    let items = []
    for (const item of this.state.items) {
      items.push(
        html`<div class="sandbox-editor-item">
          <h4
            class="sandbox-editor-item-name border-bottom-dashed padding-bottom-sm"
          >
            Item ${item.id}
          </h4>

          <div class="flex-style-container">
            <div>
              <label for="flex-grow">Flex Grow</label>
              <input
                type="number"
                id="flex-grow"
                min="0"
                value=${this.getFlexGrow(item.flex)}
                onInput=${(e) => this.setFlexGrow(item.id, e.target.value)}
              />
            </div>

            <div>
              <label for="flex-shrink">Flex Shrink</label>
              <input
                type="number"
                id="flex-shrink"
                min="0"
                value=${this.getFlexShrink(item.flex)}
                onInput=${(e) => this.setFlexShrink(item.id, e.target.value)}
              />
            </div>

            <div>
              <label for="flex-basis">Flex Basis</label>
              <input
                type="text"
                id="flex-basis"
                value=${this.getFlexBasis(item.flex)}
                onInput=${(e) => this.setFlexBasis(item.id, e.target.value)}
              />
            </div>
          </div>

          <div class="flex-style-container">
            <div>
              <label for="order">Flex Order</label>
              <input
                type="number"
                value=${item.order}
                min="0"
                onInput=${(e) =>
                  this.updateItem(item.id, 'order', e.target.value)}
              />
            </div>

            <div>
              <label for="align-self">Align Self</label>
              <select
                value=${item.alignSelf}
                onChange=${(e) =>
                  this.updateItem(item.id, 'alignSelf', e.target.value)}
              >
                <option value="auto">auto</option>
                <option value="flex-start">flex-start</option>
                <option value="flex-end">flex-end</option>
                <option value="center">center</option>
                <option value="baseline">baseline</option>
                <option value="stretch">stretch</option>
              </select>
            </div>
          </div>
        </div>`
      )
    }

    return items
  }

  render() {
    return html`
      <div class="sandbox flex flex-row gap-2">
        <div class="sandbox-container">
          <svg class="feather dir-icon">
            <use href="/src/images/feather-sprite.svg#arrow-right" />
          </svg>
          <div
            class="
            sandbox-container-inner
            ${this.state.flexClass || ''}
            ${this.state.justifyContent || ''}
            ${this.state.alignItems || ''}
            ${this.state.wrap || ''}
          "
            style=${{ gap: `${this.state.gap}px` }}
          >
            ${this.getItems()}
          </div>
        </div>
        <div class="sandbox-editor">
          <div class="sandbox-section">
            <h3>Flex Container</h3>
            <div>
              <label for="flexDirection">Flex Direction</label>
              <select
                id="flexDirection"
                value=${this.state.flexClass}
                onChange=${(e) =>
                  this.updateIcon({ flexClass: e.target.value })}
              >
                <option value="flex-row">flex-row</option>
                <option value="flex-row-reverse">flex-row-reverse</option>
                <option value="flex-column">flex-column</option>
                <option value="flex-column-reverse">flex-column-reverse</option>
              </select>
            </div>

            <div>
              <label for="gap">Flex Gap</label>
              <select
                id="gap"
                value=${this.state.gap}
                onChange=${(e) => this.setState({ gap: e.target.value })}
              >
                <option value="0">0px</option>
                <option value="2">2px</option>
                <option value="4">4px</option>
                <option value="8">8px</option>
                <option value="16">16px</option>
              </select>
            </div>

            <div>
              <label for="justifyContent">Justify Content </label>
              <select
                id="justifyContent"
                value=${this.state.justifyContent}
                onChange=${(e) =>
                  this.setState({ justifyContent: e.target.value })}
              >
                <option value="justify-content-flex-start">flex-start</option>
                <option value="justify-content-flex-end">flex-end</option>
                <option value="justify-content-center">center</option>
                <option value="justify-content-space-between">
                  space-between
                </option>
                <option value="justify-content-space-around">
                  space-around
                </option>
              </select>
            </div>

            <div>
              <label for="alignItems">Align Items</label>
              <select
                id="alignItems"
                value=${this.state.alignItems}
                onChange=${(e) => this.setState({ alignItems: e.target.value })}
              >
                <option value="align-items-flex-start">flex-start</option>
                <option value="align-items-flex-end">flex-end</option>
                <option value="align-items-center">center</option>
                <option value="align-items-baseline">baseline</option>
                <option value="align-items-stretch">stretch</option>
              </select>
            </div>

            <div>
              <label for="wrap">Flex Wrap</label>
              <select
                id="wrap"
                value=${this.state.wrap}
                onChange=${(e) => this.setState({ wrap: e.target.value })}
              >
                <option value="flex-wrap">wrap</option>
                <option value="flex-wrap-reverse">wrap-reverse</option>
                <option value="flex-nowrap">nowrap</option>
              </select>
            </div>

            <div class="sandbox-section">
              <h3 class="flex gap-1">
                Flex Items
                <div class="sandbox-item-actions">
                  <svg
                    class="feather clickable"
                    onClick=${() => this.addItem()}
                  >
                    <use href="/src/images/feather-sprite.svg#plus" />
                  </svg>
                  <svg
                    class="feather clickable"
                    onClick=${() => this.removeItem()}
                  >
                    <use href="/src/images/feather-sprite.svg#minus" />
                  </svg>
                </div>
              </h3>
              ${this.getItemsForEditor()}
            </div>
          </div>
        </div>
      </div>
    `
  }
}
