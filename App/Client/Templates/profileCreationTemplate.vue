<template>
    <div class="row">
        <div id="updateColumn" class="container-fluid col-md-6 col-md-offset-2">
            <h1 id="updateTitle">Update Profile</h1>
            <!--<img id="updateBackground"src="http://www.pngpix.com/wp-content/uploads/2016/04/Ipad-PNG-Image1.png">-->
                <h3>Basic info</h3>
                <div class="form-group col-xs-10" v-for="(info, key) in basic">
                    <div class="col-xs-2"> {{key}} :</div>
                    <input class="col-xs-4" type='text' v-model="info.value">
                    <div class="col-xs-1">
                        <button v-on:click='updateUserInfo' type="submit" class="glyphicon glyphicon-pencil"></button>
                    </div>
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
</style>