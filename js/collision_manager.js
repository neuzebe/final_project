function CollisionManager()
{
    /*
     * checkCollision(object_one, object_two)
     * utility function to determine whether two on-stage objects
     * are colliding
     */
    this.checkCollision = function(object_one, object_two)
    {
        var p1 = new createjs.Point();
        var p2 = new createjs.Point();
        p1.x = object_one.image.x;
        p1.y = object_one.image.y;
        p2.x = object_two.image.x;
        p2.y = object_two.image.y;

        return (this.distanceBetween(p1, p2) < ((object_one.image.image.height/2) + (object_two.image.image.height/2)));        
    }    
    
    /*
    * distanceBetween(point1, point2)
    * utility function to calculate the distance between two objects
    * on the stage
    */
    this.distanceBetween = function(p1, p2)
    {
        var result = 0;
        var xPoints = 0;
        var yPoints = 0;

        xPoints = p2.x - p1.x;
        xPoints = xPoints * xPoints;

        yPoints = p2.y - p1.y;
        yPoints = yPoints * yPoints;

        result = Math.sqrt(xPoints + yPoints);

        return result;    
    }    
}