<template>
    <div>
        <table>
        <tr>
            <th> Do-you? </th>
            <th>Next Event</th>
            <th>Event Name</th>
            <th>Event Type</th>

        </tr>
        <tr v-for='item in result'>
            <td v-if='!$store.state.user.username'>Sign in to join!</td>
            <td v-else-if='hasNotJoined(item)'><button class="btn btn-success" v-on:click="join(item)">Join</button></td>
            <td v-else-if='!hasNotJoined(item)'><button class="btn btn-danger" v-on:click="unjoin(item)">Unjoin</button></td>
            <td> {{ moment(item.date).format('MMMM Do YYYY, h:mm:ss a') }}  </td>
            <td> {{ item.eventName}}</td>
            <td> {{ item.eventType }} </td>

        </tr>
        </table>
    </div>
</template>

<style>
    a:hover {
        color: #fff;
    }

    #eventLink {
        margin-top: 20px;
        font-weight: 800;
        margin-left: 50px;
        text-align: center;
        background: #2c4355;
        width: 75%;
        color: #fff;
    }

    #signIn {
        display: block;
    }

    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 75%;
        font-weight: 800;
        text-align: center;
    }

    td,
    th {
        border: 1px solid rgba(165, 166, 167, 0.08);
        text-align: left;
        padding: 8px;
        font-weight: 800;
        text-align: center;
    }

    tr:nth-child(even) {
        background-color: #ffffff;
    }

    tr:nth-child(odd) {
        background-color: #d9b883;
    }
</style>