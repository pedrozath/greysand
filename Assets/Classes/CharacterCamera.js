#pragma strict

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

function Update(){
  x += Input.GetAxis("Mouse X") * rotation_speed;
  y -= Input.GetAxis("Mouse Y") * rotation_speed;
  z += Input.GetAxis("Mouse ScrollWheel") * rotation_speed;
  var adjusted_z = check_collision(-z);
  var rotation = Quaternion.Euler(y, x, 0);
  transform.position = rotation * Vector3(0,0,-adjusted_z) + target.position;
  transform.rotation = rotation;
}

function check_collision(distance: float): float {
  Debug.DrawRay(target.position, transform.position, Color.red, distance, true);
  var hit: RaycastHit;
  if (Physics.Raycast(target.position, transform.position, hit, distance)) {
    return hit.distance;
  } else {
    return distance;
  }
}
