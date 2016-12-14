<template>
    <div>
        <div class="form-group col-xs-12">
            <input type="text" class="form-control" id="exampleInputEmail2" placeholder="username" v-model="username" required>
        </div>
        <div class="form-group col-xs-12">
            <input type="password" class="form-control" id="exampleInputPassword2" placeholder="Password" v-model="password" required>
        </div>
         <div class="form-group col-xs-6">
            <input type="number" min="18" max="120" class="form-control" placeholder="Age" v-model="age" required>
        </div>
        <div class="form-group col-xs-6">
          <input type="text" class="form-control" placeholder="Location" v-model="location" required>
        </div>
        <div class="form-group col-xs-12 radio">
        	<label class="col-xs-3 control-label">Gender:</label>
	        <label class="radio-inline col-xs-offset-2">
					  <input type="radio" name="inlineRadioOptions1" value="Female" id="Female" v-model="gender"> Female
					</label>
					<label class="radio-inline">
					  <input type="radio" name="inlineRadioOptions1" value="Male" id="Male" v-model="gender"> Male
					</label>
				</div>
				<div class="form-group col-xs-12 radio">
        	<label class="col-xs-3 control-label">Interest:</label>
	        <label class="radio-inline col-xs-offset-2">
					  <input type="radio" name="inlineRadioOptions2" value="Female" id="Female" v-model="interestedIn"> Female
					</label>
					<label class="radio-inline">
					  <input type="radio" name="inlineRadioOptions2" value="Male" id="Male" v-model="interestedIn"> Male
					</label>
					<label class="radio-inline col-xs-offset-2">
					  <input type="radio" name="inlineRadioOptions2" value="Both" id="Both" v-model="gender"> Both
					</label>
				</div>
        <div class="checkbox col-xs-6">
          <label>
             <input type="checkbox"> keep me logged-in
          </label>
        </div>
        <div class="form-group col-xs-4">
          <button type='button' class="btn btn-primary btn-block" v-on:click.prevent='signup'>Sign up</button>
        </div>
    </div>
</template>