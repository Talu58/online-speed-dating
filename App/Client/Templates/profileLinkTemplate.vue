<template>
    <div>
        <div v-if="!checkAuth">

            
                <div class="row">
                    <div>
                        <h2 class="jumbotron sup">Sign-up here!</h2>
                        <h4 class="jumbotron">Signup via</h4>
                        <div class="social-buttons jumbotron">
                            <a href="#" class="btn btn-fb"><i class="fa fa-facebook"></i> Facebook</a>
                            <a href="#" class="btn btn-tw"><i class="fa fa-twitter"></i> Twitter</a>
                        </div>
                        <h4 class="jumbotron">or</h4>
                        <form class="form" role="form" method="post" action="signup" accept-charset="UTF-8" id="login-nav">
                            <signup></signup>
                        </form>
                    </div>
                        </router-link>
                    </div>
                </div>
        </div>
    </div>
</template>

<style>
    .jumbotron.link {
        padding-left: 0;
        padding-right: 0;
    }
    h2.jumbotron.sup {
        padding-top: 28px;
        padding-left: 42px;
        width: 284px;
    }
    .social-buttons.jumbotron {
        padding-left: 45px;
    }
    .btn.btn-fb {
        padding-right: 10px;
    }
    .span {
        padding-left: 15px;
    }

</style>