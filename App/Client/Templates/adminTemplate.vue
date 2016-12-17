<template>
  <div>
    <div class="col-xs-4">
      <div class="eventCreation">
        <p id="header"> Create an event </p>
        <form>
          <label class="col-xs-4 create">Event interest:</label>
          <select v-model="eventInterest" class="create">
            <option v-for='interest in interests'> {{interest}}</option>
          </select>
          <br>
          <label class="col-xs-4 create">Event Name:</label>
          <input class="create" type="text" placeholder="Enter event name" v-model="eventName" >
          <br>
          <label class="col-xs-4 create">Event Date:</label>
          <input class="create" type="datetime-local" placeholder="Enter a date" v-model="date">
          <br>
          <label class="col-xs-4 create">Location:</label>
          <input class="create" type="text" placeholder="Enter a location" v-model="eventLocation">
          <br>
          <label class="col-xs-4 create">Gender:</label>
          <label class="radio-inline create">
            <input type="radio" name="inlineRadioOptions1" value="Female" id="Female" v-model="eventGender"> Female
          </label>
          <label class="radio-inline create">
            <input type="radio" name="inlineRadioOptions1" value="Male" id="Male" v-model="eventGender"> Male
          </label>
          <label class="radio-inline create">
            <input type="radio" name="inlineRadioOptions1" value="Both" id="Both" v-model="eventGender"> Both
          </label>
          <br>
          <label class="col-xs-4 create">Relationship:</label>
          <label class="radio-inline create">
            <input type="radio" name="inlineRadioOptions2" value="Straight" id="Straight" v-model="eventRelationshipType"> Straight
          </label>
          <label class="radio-inline create">
            <input type="radio" name="inlineRadioOptions2" value="homosexual" id="homosexual" v-model="eventRelationshipType"> Homosexual
          </label>
          <br>
          <button class="col-xs-4 col-xs-offset-4 btn btn-primary create" role="button" v-on:click.prevent="submit">Create Event</button>
        </form>
      </div>
      <div class="eventList">
        <p id="header"> Next events </p>
        <table class="col-xs-12">
          <tr>
              <th class="col-xs-4">Date</th>
              <th class="col-xs-4">Event Name</th>
              <th class="col-xs-4">Event Type</th>
          </tr>
          <tr v-for='event in this.allEvents' v-on:click.prevent="updateCurrentEvent(event.eventName)">
            <td class="col-xs-4"> {{ moment(event.date).format('MMMM Do YYYY, h:mm:ss a') }}  </td>
            <td class="col-xs-4"> {{ event.eventName}}</td>
            <td class="col-xs-4"> {{ event.eventType }} </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="col-xs-6 eventCreation">
      <div class="" v-if="currentEvent">
        <p id="header">Event controller</p>
        <div class="event-controller-details">
          <div class="col-xs-2"> <strong>Name:</strong></div>
          <div class="col-xs-2" >{{currentEvent.eventName}}</div>
          <div class="col-xs-2"><strong>Interest: </strong> </div>
          <div class="col-xs-2">{{currentEvent.eventType}}</div>
          <div class="col-xs-2"><strong>Location: </strong> </div>
          <div class="col-xs-2">{{currentEvent.eventLocation}}</div>
          <br>
          <div class="col-xs-2"><strong>Gender: </strong> </div>
          <div class="col-xs-2">{{currentEvent.eventGender}}</div>
          <div class="col-xs-2"><strong>Relationship: </strong> </div>
          <div class="col-xs-2">{{currentEvent.eventRelationshipType}}</div>
        </div>
        <div class="col-xs-2"><strong>Usernames: </strong></div>
        <br>
          <span v-for="users in currentEvent.usernames">{{users}}, </span>
        <div class="col-xs-12 button-control">
          <div class='col-xs-3' > <button v-on:click.prevent="setupEvent(currentEvent)" type="submit" class="btn btn-primary btn-block">Setup Event</button></div>
          <div class='col-xs-3' > <button v-on:click.prevent="startEvent(currentEvent)" type="submit" class="btn btn-primary btn-block">Start Event</button></div>
          <div class='col-xs-3' ><button v-on:click.prevent="incrementRound(currentEvent)" type="submit" class="btn btn-primary btn-block">Increment Round</button></div>
          <div class='col-xs-3' ><button v-on:click.prevent="endEvent(currentEvent)" type="submit" class="btn btn-primary btn-block">End Event</button></div>
        </div>
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
    text-align: center;
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
    margin-bottom: 20px;
    padding-bottom: 50px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .eventList {
    background: #5d868a;
    margin-left: 10px;
    margin-bottom: 20px;
    padding-bottom: 50px;
    padding-left: 10px;
    padding-right: 10px;
    height: 500px;
  }

  .create {
    margin-bottom: 10px;
  }

  .button-control {
    margin-top: 30px;
  }

  .event-controller-details {
    margin-bottom: 30px;
  }
  /*
  #signin_info {
    margin-top: 20px;
    background: rgba(255, 255, 255,1);
    padding-left: 10px;
  }
  */
  .events-list {
    width: 100%;
  }

  tr:hover {background-color: #f5f5f5}

  title {
    font: bold;
    color: #fff;
    background: #ddd;

  }
</style>