<template>
	<v-container>
		<span>
			<h1 class="pt-2 font-weight-medium primary--text">
				Hi, {{ name }}!
			</h1></span
		>
		<p class="secondary--text">Let's check out your wallet</p>

		<v-card class="my-4 px-4 py-4">
			<h4 class="font-weight-regular secondary--text">Balance</h4>
			<span
				><h1 class="font-weight-medium secondary--text">223.l4 LKR</h1></span
			>
			<v-btn outlined block color="primary">RECHARGE</v-btn>
		</v-card>

		<v-divider></v-divider>
		<h2 class="pt-4 font-weight-medium primary--text">History</h2>
		<p class="secondary--text">Here is the latest transactions you performed</p>

		<v-card>
			<v-container>
				<v-row>
					<v-col>
						<div class="d-flex align-center flex-grow-1 flex-wrap">
							<div>
								<img class="mr-3" src="@/assets/icons/up-green.png" width="20px">
							</div>
							<div class="me-auto pe-2">
								<h4 class="font-weight-semibold">
									Deposit
								</h4>
								<span class="text-xs secondary--text">2010-12-24</span>
							</div>

							<span class="font-weight-semibold success--text">
								+ 500 LKR
							</span>
						</div>
					</v-col>
				</v-row>
			</v-container>
		</v-card>

	</v-container>
</template>

<script>
export default {
	data() {
		return {
			name: 'Charith',
		};
	},
	name: 'Wallet',
};
</script>
