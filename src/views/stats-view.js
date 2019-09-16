import { html } from "lit-element";
import { connect } from "pwa-helpers";
import { store } from "../redux/store.js";
import { statsSelector } from "../redux/reducer.js";
import "@vaadin/vaadin-charts";
import { BaseView } from "./base-view.js";

//Connect the view to the Redux store
class StatsView extends connect(store)(BaseView) {
  static get properties() {
    return {
      //Define a property for the chart configuration. We want the view to get updated any time it changes.
      chartConfig: { type: Object }
    };
  }

  stateChanged(state) {
    const stats = statsSelector(state);
    //Construct a config object for Vaadin Charts based on the stats selector
    this.chartConfig = [
      { name: "Completed", y: stats.completed },
      { name: "Active", y: stats.active }
    ];
    //Track if there are any todos to show the chart conditionally.
    this.hasTodos = state.todos.length > 0;
  }

  render() {
    return html`
      <style>
        stats-view {
          display: block;
        }
      </style>
        <!-- Split out the chart into a helper method. -->
      ${this.getChart()}
    `;
  }

  getChart() {
    //If there are todos, return a template with a vaadin-chart, otherwise return a simple message.
    if (this.hasTodos) {
      return html`
        <vaadin-chart type="pie">
          <vaadin-chart-series
            .values="${this.chartConfig}"
          ></vaadin-chart-series>
        </vaadin-chart>
      `;
    } else {
      return html`
        <p>Nothing to do! 🌴🍻☀️</p>
      `;
    }
  }
}

customElements.define("stats-view", StatsView);
