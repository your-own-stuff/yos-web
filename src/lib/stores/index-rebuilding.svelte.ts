export const INDEX_CONTEXT_KEY = 'INDEX_REBUILDING';

function createIndexRebuildingRune(rebuilding: boolean) {
	let indexRebuilding = $state(rebuilding);

	function setRebuilding(value: boolean) {
		indexRebuilding = value;
	}

	return {
		get indexRebuilding() {
			return indexRebuilding;
		},
		setRebuilding
	};
}

export const rebuilding = createIndexRebuildingRune(false);
