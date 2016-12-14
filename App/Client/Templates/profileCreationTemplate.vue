<template>
    <div class="row">
        <div id="updateColumn" class="container-fluid col-md-4 col-md-offset-4">
            <h1 id="updateTitle">Update Profile</h1>
            <!--<img id="updateBackground"src="http://www.pngpix.com/wp-content/uploads/2016/04/Ipad-PNG-Image1.png">-->
            <div id="ColumnInput" class="row col-md-4 col-md-offset-4">
                <form>
                    <div id="updateForm" class="row">
                        <input name='name' placeholder='Enter name' type='text' v-model='$store.state.user.name' required>
                    </div>
                    <div id="updateForm" class="row">
                        <input name='age' placeholder='Age' type='number' v-model='$store.state.user.age' required>
                    </div>
                    <div id="updateForm" class="row">
                        <input name='gender' placeholder='Gender' type='text' v-model='$store.state.user.gender' required>
                    </div>
                    <div id="updateForm" class="row">
                        <input name='location' placeholder='Where Are You?' type='text' v-model='$store.state.user.location' required>
                    </div>
                    <div id="updateForm" class="row">
                        <input name='profileImg' placeholder='Upload a photo' type='text' v-model='$store.state.user.profileImg' required>
                    </div>
                    <div id="updateForm" class="row">
                        <input maxlength='200' name='userinfo' placeholder='Tell Us about yourself' type='text' v-model='$store.state.user.userinfo'
                            required>
                    </div>
                </form>
                <button id="updateButton" v-on:click='setUserInfo' class="glyphicon glyphicon-ok">Save</button>
            </div>
        </div>
</template>

<style>
    #ColumnInput {
        position: absolute;
    }
    #updateBackground {
        width: 100%;
        position: absolute;
    }
    #profileUpdateBackground {
        width: 100%;
    }

    #updateForm {
        padding-top: 5px;
        padding-bottom: 5px;
    }

    #updateTitle {
        color: #3D403D;
    }

    #updateButton {
        /*background: transparent;*/
        float: right;
    }
</style>