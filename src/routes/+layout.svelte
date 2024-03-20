<script>
	import { ModeWatcher, mode } from 'mode-watcher';
	import { Toaster } from 'svelte-sonner';
	import '../app.pcss';
</script>

<ModeWatcher />
<Toaster theme={$mode} />
<slot />
