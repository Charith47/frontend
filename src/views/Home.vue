<template>
	<v-container>
		<br />
		<v-card class="d-flex justify-center" flat color="transparent">
			<img width="150" src="../assets/logo/logo-circle-purple.svg" alt="" />
		</v-card>

		<br />
		<v-row>
			<v-col cols="12" sm="4">
				<!-- selection panel -->
				<v-card class="pa-2 pb-0" outlined elevation="4">
					<v-tabs grow color="deep-purple accent-4">
						<!-- switch between modes -->
						<v-tab>
							Short Distance
						</v-tab>
						<v-tab>
							Long Distance
						</v-tab>

						<!-- short distance -->
						<v-tab-item>
							<v-text-field
								class="pt-6"
								outlined
								label="From"
								placeholder="Search your departure location"
							></v-text-field>
							<v-text-field
								outlined
								label="To"
								placeholder="Search arrival location"
							></v-text-field>

							<v-text-field
								outlined
								label="Route"
								placeholder="Enter your prefferd route"
							></v-text-field>

							<v-btn dark color="primary" block class="mb-4">
								Search
							</v-btn>
						</v-tab-item>

						<!-- long distance -->
						<v-tab-item>
							<v-text-field
								class="pt-6"
								outlined
								label="From"
								placeholder="Search your departure location"
							></v-text-field>
							<v-text-field
								outlined
								label="To"
								placeholder="Search arrival location"
							></v-text-field>

							<v-text-field
								outlined
								label="Journey Time"
								type="time"
								id="meeting-time"
								name="meeting-time"
								value="2018-06-12T19:30"
								min="2018-06-07T00:00"
								max="2018-06-14T00:00"
							/>

							<!-- date picker -->
							<v-dialog
								ref="dialog"
								v-model="modal"
								:return-value.sync="date"
								persistent
								width="290px"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										v-model="date"
										label="Journey date"
										prepend-icon="mdi-calendar"
										readonly
										v-bind="attrs"
										v-on="on"
									></v-text-field>
								</template>
								<v-date-picker
									class="pt-0"
									min="2021-09-22"
									v-model="date"
									scrollable
								>
									<v-spacer></v-spacer>
									<v-btn text color="primary" @click="modal = false">
										Cancel
									</v-btn>
									<v-btn text color="primary" @click="$refs.dialog.save(date)">
										OK
									</v-btn>
								</v-date-picker>
							</v-dialog>
							<v-btn dark color="primary" block class="mb-4">
								Search
							</v-btn>
						</v-tab-item>
					</v-tabs>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<style scoped></style>

<script>
export default {
	name: 'Home',
	data: () => ({
		date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
			.toISOString()
			.substr(0, 10),
		menu: false,
		modal: false,
		menu2: false,
	}),
};
</script>
