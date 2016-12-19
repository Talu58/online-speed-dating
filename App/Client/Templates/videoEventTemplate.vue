<template>
  <div>
    <template v-if='beforeEvent'>
      <button v-on:click.prevent='joinEvent'>I'm Ready to Date!</button>
    </template>
    <template v-if='activeEvent'> //else if
      <transition name='relocate'>
        <div v-if='soloView' key='soloView' v-html='myVideo'></div>
        <div v-else key='duoView' v-html='myVideo'></div>
      </transition>
      <template  v-if='soloView'>
        <template v-if='beforeStart'>
          <div>WAIT</div>
        </template>
        <template v-if='started'>
          <template v-if='Caller'>
            <button v-if='calleeReady' v-on:click.prevent='eventCall'>Your Date Awaits!</button>
            <div v-else>Please be patient while your date gets readyl</div> 
          </template>
          <template v-if='Callee'>
            <div v-if='calleeReady'>Please be patient while your date gets readyl</div> 
            <button v-else v-on:click.prevent='eventCall'>Your Date Awaits!</button>
          </template>
        </template>
        <template v-if='duoView'>
          <div v-html='videoOut'></div>
        </template>    
      </template>
        
    </template>
    <template v-if='afterEvent'>
      <div>Byeeeeeeeeee</div>
    </template>
  </div>
</template>     

//use transition to change size/location of own video when a call starts 

//using transitions could probably make the transition between states
//look better
//would also allow us to hook javascript into the transitions
//which might be helpful in terms of starting/ending calls etc

