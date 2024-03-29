import './main.scss'
import template from './main.html'

import { ApiService } from './services/api'
import { SearchService } from './services/search'
import { Map } from './components/map/map'
import { LayerPanel } from './components/layer-panel/layer-panel'
import { InfoPanel } from './components/info-panel/info-panel'
import { SearchBar } from './components/search-bar/search-bar'

/** Main UI Controller Class */
class ViewController {
  /** Initialize Application */
  constructor () {
    document.getElementById('app').outerHTML = template

    this.searchService = new SearchService() // Initialize search service

    // Initialize API service
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      this.api = new ApiService('http://localhost:5000/')
    } else {
      this.api = new ApiService('https://americanfugitive.map.devopstar.com/')
    }

    this.locationPointTypes = ['bank', 'clothing', 'donut', 'gas', 'stash', 'store', 'pharmacy', 'police']
    this.initializeComponents()
    this.loadMapData()
  }

  /** Initialize Components with data and event listeners */
  initializeComponents () {
    // Initialize Info Panel
    this.infoComponent = new InfoPanel('info-panel-placeholder', {
      data: { apiService: this.api }
    })

    // Initialize Map
    this.mapComponent = new Map('map-placeholder', {
      events: { locationSelected: event => {
        // Show data in infoComponent on "locationSelected" event
        const { name, type, summary } = event.detail
        this.infoComponent.showInfo(name, type, summary)
      }}
    })

    // Initialize Layer Toggle Panel
    this.layerPanel = new LayerPanel('layer-panel-placeholder', {
      data: { layerNames: [...this.locationPointTypes] },
      events: { layerToggle:
        // Toggle layer in map controller on "layerToggle" event
        event => { this.mapComponent.toggleLayer(event.detail) }
      }
    })

    // Initialize Search Panel
    this.searchBar = new SearchBar('search-panel-placeholder', {
      data: { searchService: this.searchService },
      events: { resultSelected: event => {
        // Show result on map when selected from search results
        let searchResult = event.detail
        if (!this.mapComponent.isLayerShowing(searchResult.layerName)) {
          // Show result layer if currently hidden
          this.layerPanel.toggleMapLayer(searchResult.layerName)
        }
        this.mapComponent.selectLocation(searchResult.id, searchResult.layerName)
      }}
    })
  }

  /** Load map data from the API */
  async loadMapData () {

    // Download location point geodata
    for (let locationType of this.locationPointTypes) {
      // Download location type GeoJSON
      const geojson = await this.api.getLocations(locationType)

      // Add location data to search service
      this.searchService.addGeoJsonItems(geojson, locationType)

      // Add data to map
      this.mapComponent.addLocationGeojson(locationType, geojson, this.getIconUrl(locationType))
    }

    // Show stash layer
    this.layerPanel.toggleMapLayer('stash')
  }

  /** Format icon url for layer type  */
  getIconUrl (layerName) {
    return `./icons/${layerName}.png`
  }
}

window.ctrl = new ViewController()
