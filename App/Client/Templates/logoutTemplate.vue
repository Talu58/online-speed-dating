<template>
    <div>
        <button v-if='this.$store.state.user.username' type="submit" class="btn btn-primary btn-block" v-on:click.prevent="logout">Logout</button>
    </div>
</template>