<script>
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { Toast, initializeStores, storePopup } from '@skeletonlabs/skeleton';
	import '../app.pcss';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	initializeStores();
</script>

<Toast position="br" />
<slot />
