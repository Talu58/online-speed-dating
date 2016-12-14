<template>
    <div>
        <div v-if='this.$store.state.user.username'>
        </div>
        <div v-else>

            <p class="navbar-text">Already have an account?</p>


            <h2>Login</h2>
                <div class="row">
                    <div class="col-md-12">
                        Login via
                        <div class="social-buttons">
                            <a href="#" class="btn btn-fb"><i class="fa fa-facebook"></i> Facebook</a>
                            <a href="#" class="btn btn-tw"><i class="fa fa-twitter"></i> Twitter</a>
                        </div>
                        or
                        <form class="form" role="form" method="post" action="login" accept-charset="UTF-8" id="login-nav">
                            <login></login>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox"> keep me logged-in
                                </label>
                            </div>
                        </form>
                    </div>
                    <div class="bottom text-center">
                        New here ?
                        <router-link to='/signup'><a href="#/signup"><b>Join Us</b></a>
                        </router-link>
                    </div>
                </div>
        </div>
    </div>
</template>

<style>
</style>