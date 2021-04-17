import actions from "./actions.js";

export default {
    namespaced: true,
    state() {
		return {
			measurements: []
		};
    },
    getters: {
		getMeasurements(state) {
			return state.measurements;
		}
    },
    mutations: {
		setMeasurements(state, payload) {
			state.measurements = payload.measurements;
		}
    },
    actions: actions
};
