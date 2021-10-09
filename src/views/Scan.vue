<template>
	<v-container class="d-flex flex-column">
		<v-row>
			<v-col class="orange">
				<v-alert
					v-if="error"
					border="top"
					color="red"
					dismissible
					dense
					type="error"
					>{{ error }}</v-alert
				>
			</v-col>
		</v-row>
		<v-row>
			<v-col class="green">
				<qrcode-stream @decode="onDecode" @init="onInit" />
			</v-col>
		</v-row>
		<v-row>
			<v-col class="blue">
				<v-alert
					v-if="result"
					border="top"
					color="green"
					dismissible
					type="success"
					>{{ result }}</v-alert
				>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader';

export default {
	name: 'Scan',
	components: { QrcodeStream },

	data() {
		return {
			result: '',
			error: '',
		};
	},

	methods: {
		onDecode(result) {
			this.result = result;
		},

		async onInit(promise) {
			try {
				await promise;
			} catch (error) {
				if (error.name === 'NotAllowedError') {
					this.error = 'ERROR: you need to grant camera access permission';
				} else if (error.name === 'NotFoundError') {
					this.error = 'ERROR: no camera on this device';
				} else if (error.name === 'NotSupportedError') {
					this.error = 'ERROR: secure context required (HTTPS, localhost)';
				} else if (error.name === 'NotReadableError') {
					this.error = 'ERROR: is the camera already in use?';
				} else if (error.name === 'OverconstrainedError') {
					this.error = 'ERROR: installed cameras are not suitable';
				} else if (error.name === 'StreamApiNotSupportedError') {
					this.error = 'ERROR: Stream API is not supported in this browser';
				} else if (error.name === 'InsecureContextError') {
					this.error =
						'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
				} else {
					this.error = `ERROR: Camera error (${error.name})`;
				}
			}
		},
	},
};
</script>
