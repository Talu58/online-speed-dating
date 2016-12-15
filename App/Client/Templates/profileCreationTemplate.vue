<template>
    <div class="row">
        <h1 class="col-xs-offset-1" id="updateTitle">Update Your Profile</h1>
        <div class="container-fluid col-xs-5 col-xs-offset-1">
            <h3>Basic info</h3>
            <div class="form-group col-xs-12" v-for="(info, key) in basic">
                <div class="col-xs-2 col-xs-offset-2"> {{key}} :</div>
                <input class="col-xs-4" placeholder="Please fill me in" type="text" v-model="info.value">
                <div class="col-xs-1">
                    <button v-on:click="updateUserInfo(key, info.value)" type="submit" class="glyphicon glyphicon-pencil"></button>
                </div>
            </div>
        </div>
        <div class="container-fluid col-xs-5">
            <h3>Personal info</h3>
            <div class="form-group col-xs-10 col-xs-offset-2">
                <div class="col-xs-3 col-xs-offset-2">Divorced: </div>
                <div>
                    <input type="radio" id="divorced" value="Yes" v-model="personal.divorced">
                    <label for="yes">Yes</label>
                    <input type="radio" id="divorced" value="No" v-model="personal.divorced">
                    <label for="no">No</label>
                </div>
                <br>
                <div class="col-xs-3 col-xs-offset-2">Number of kids: </div>
                <input type="number" min="0" max="15" placeholder="0" v-model="personal.kids" required>
                <br>
                <div class="col-xs-3 col-xs-offset-2">Description: </div>
                <br>
                <br>
                <textarea class="col-xs-6 col-xs-offset-2" v-model="personal.description" placeholder="Add your description"></textarea>
                <div class="col-xs-1">
                    <button v-on:click="updateUserInfo" type="submit" class="glyphicon glyphicon-pencil"></button>
                </div>
               <!--  <input class="col-xs-4" placeholder="Please fill me in" type="text" v-model="info.value">
                <div class="col-xs-1">
                    <button v-on:click="updateUserInfo(key, info.value)" type="submit" class="glyphicon glyphicon-pencil"></button>
                </div> -->
            </div>
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

    h3 {
        text-align: center;
    }
</style>