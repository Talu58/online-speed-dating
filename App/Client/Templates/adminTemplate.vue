<template>
  <div>
    <div class="">
      <div class="col-xs-4 eventCreation">
        <p id="header"> Create an event </p>
        <form>
          <label class="col-xs-4 create">Event interest:</label>
          <input class="create" type="text" placeholder="Enter event type" v-model="eventType" >
          <select v-model="selected">
            <option v-for="interest in insterests">{insterest}</option>
          </select>
          <span>Selected: {{ selected }}</span>
          <br>
          <label class="col-xs-4 create">Event Name:</label>
          <input class="create" type="text" placeholder="Enter event name" v-model="eventName" >
          <br>
          <label class="col-xs-4 create">Event Date:</label>
          <input class="create" type="datetime-local" placeholder="Enter a date" v-model="date">
          <br>
          <button class="col-xs-4 col-xs-offset-4 btn btn-primary" role="button" v-on:click.prevent="submit">Create Event</button>
        </form>
      </div>
    </div>
    <div class="col-xs-6">
      <div class="eventCreation" v-for='event in this.allEvents'>
        <div class="col-xs-2" >{{event.eventName}}</div>
        <div class='col-xs-2' >{{moment(event.date).format('MMMM Do YYYY, h:mm:ss a')}}</div>
        <div class='col-xs-2' > <button v-on:click.prevent="setupEvent(event)" type="submit" class="btn btn-primary btn-block">Setup Event</button></div>
        <div class='col-xs-2' > <button v-on:click.prevent="startEvent(event)" type="submit" class="btn btn-primary btn-block">Start Event</button></div>
        <div class='col-xs-2' ><button v-on:click.prevent="incrementRound(event)" type="submit" class="btn btn-primary btn-block">Increment Round</button></div>
        <div class='col-xs-2' ><button v-on:click.prevent="endEvent(event)" type="submit" class="btn btn-primary btn-block">End Event</button></div>
      </div>
    </div>
  </div>
</template>



<style>
  #header{
    font-size: 20px;
    font-weight: 400;
    background: #5d868a;
    padding: 10px 10px 10px 10px;
    color: #fff;
  }
  small {
    margin-left: 5px;
  }
  #title {
    background: rgba(173, 216, 230,1);
  }

  .eventCreation {
    background: #5d868a;
    margin-left: 10px;
    padding-bottom: 10px;
  }

  .create {
    margin-bottom: 10px;
  }
  /*
  #signin_info {
    margin-top: 20px;
    background: rgba(255, 255, 255,1);
    padding-left: 10px;
  }
  */
  title {
    font: bold;
    color: #fff;
    background: #ddd;

  }
</style>