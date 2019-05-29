import './info-panel.scss'
import template from './info-panel.html'
import { Component } from '../component'

/**
 * Info Panel Component
 * Download and display metadata for selected items.
 * @extends Component
 */
export class InfoPanel extends Component {
  /** LayerPanel Component Constructor
   * @param { Object } props.data.apiService ApiService instance to use for data fetching
   */
  constructor (placeholderId, props) {
    super(placeholderId, props, template)
    this.api = props.data.apiService

    // Toggle info panel on title click
    this.refs.title.addEventListener('click', () => this.refs.container.classList.toggle('info-active'))
  }

  /** Show info when a map item is selected */
  async showInfo (name, type, summary) {
    // Display location title
    this.refs.title.innerHTML = `<h1>${name}</h1>`

    // Download and display information, based on location type
    this.refs.content.innerHTML = (type === 'Stash')
      ? await this.getLocationDetailHtml(type, summary)
      : `<div></div>`
  }

  /** Create location detail HTML string */
  getLocationDetailHtml (type, summary) {
    // Get location metadata
    //const locationInfo = await this.api.getLocationSummary(id)

    // Format summary template
    const summaryHTML = this.getInfoSummaryHtml(summary)

    // Return filled HTML template
    return `
      <h3>${type.toUpperCase()}</h3>
      ${summaryHTML}`
  }

  /** Format location summary HTML template */
  getInfoSummaryHtml (summary) {
    return `
      <div>${summary}</div>`
  }
}
