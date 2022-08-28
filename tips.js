// I managed to solve this. The reason why things slide down on slopes is that on every collision they're moved outside the collision bounds, then they fall down a little bit, then again collide, etc... in a loop... which is I guess OK for most of the games but I wanted it to be different. So I solved it by bypassing the default respondToCollision function call and implemented a slightly different variant:


onCollision : function (response, other) {
        
  // Slopes are marked "Slope" type in Tiled
  if(other.type === "Slope") {
      var overlap = response.overlapV;
      // Move out of collision bounds, but only on the Y axis
      overlapCopy = overlap.clone();
      overlapCopy.x = 0;
      this.pos.sub(overlapCopy);
      // adjust velocity
      if (overlap.x !== 0) {
          this.body.vel.x = ~~(0.5 + this.body.vel.x - overlap.x) || 0;
          // Removed bouncing because I don't need it
      }
      if (overlap.y !== 0) {
          this.body.vel.y = ~~(0.5 + this.body.vel.y - overlap.y) || 0;
           // cancel the falling an jumping flags if necessary
           var dir = Math.sign(me.game.world.gravity.y * this.body.gravityScale) || 1;
           this.body.falling = overlap.y >= dir;
           this.body.jumping = overlap.y <= -dir;
      }
      return false;
  }

return true;
}