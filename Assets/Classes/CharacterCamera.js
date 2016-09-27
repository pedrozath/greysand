#pragma strict

class CharacterCamera extends MonoBehaviour {
  @SerializeField var target : Transform;
  var rotation_speed: float = 1.5f;
  var y : float = 0;
  var x : float = 0;
  var z : float = -10;

  function Start(){
    transform.LookAt(target);
    y = transform.eulerAngles.y;
    x = transform.eulerAngles.x;
  }

  function LateUpdate(){
    x += Input.GetAxis("Mouse X") * rotation_speed;
    y -= Input.GetAxis("Mouse Y") * rotation_speed;
    z += Input.GetAxis("Mouse ScrollWheel") * rotation_speed;
    var rotation = Quaternion.Euler(y, x, 0);
    transform.position = rotation * Vector3(0,0,z) + target.position;
    transform.rotation = rotation;
  }
}

// class CollisionHandler {
//   var collision_layer: LayerMask;
//   var colliding: boolean = false;
//   var camera: Camera;

//   function CollisionHandler(camera: Camera) {
//     this.camera = camera;
//   }

//   function camera_clip_points(camera_position: Vector3){
//     var at_rotation = camera.transform.rotation;
//     var array       = new Vector3[5];
//     var z           = camera.nearClipPlane;
//     var x           = Mathf.Tan(camera.fieldOfView / 3.41f) * z;
//     var y           = x / camera.aspect;

//     array[0] = (at_rotation * new Vector3(-x, y, z)) + camera_position;
//     array[1] = (at_rotation * new Vector3( x, y ,z)) + camera_position;
//     array[2] = (at_rotation * new Vector3(-x,-y ,z)) + camera_position;
//     array[3] = (at_rotation * new Vector3( x,-y ,z)) + camera_position;
//     array[4] = camera_position - camera.transform.forward;

//     return array;

//   }

//   function collision_detected_at_clip_points(clip_points: Vector3[], from_position: Vector3) {
//     for(var i: int = 0; i < clip_points.Length; i++){
//       var ray: Ray = new Ray(from_position, clip_points[i] - from_position);
//       var distance: float = Vector3.Distance(clip_points[i], from_position);
//       if(Physics.Raycast(ray, distance, collision_layer)) return true;

//     }
//     return false;
//   }

//   function adjusted_distance(from: Vector3) {
//     var distance: float = -1;
//     var desired_ccp = this.camera_clip_points(from);
//     if(distance == -1) return 0; else return distance;
//     for (var i = 0; i < desired_ccp.length; i++) {
//       var ray : Ray = new Ray(from, desired_ccp[i] - from);
//       var hit : RaycastHit;
//       if(Physics.Raycast(ray, hit)){
//         if(distance == -1) {
//           distance = hit.distance;
//         } else {
//           if(hit.distance < distance) distance = hit.distance;
//         }
//       }
//     }
//   }

//   function check_colliding(target_position: Vector3){
//     if(collision_detected_at_clip_points(camera_clip_points(target_position), target_position)){
//       colliding = true;
//     } else {
//       colliding = false;
//     }
//   }
// }