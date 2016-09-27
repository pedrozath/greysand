#pragma strict

@SerializeField var target: Transform;

var controller: CharacterController;
var moveSpeed: float;

function Start(){
  controller = GetComponent(CharacterController);
}

function Update() {
  var movement: Vector3 = Vector3.zero;
  var horInput: float  = Input.GetAxis("Horizontal");
  var vertInput: float = Input.GetAxis("Vertical");

  if(horInput != 0 || vertInput != 0){
    movement.x = horInput * moveSpeed;
    movement.z = vertInput * moveSpeed;

    var tmp: Quaternion = target.rotation;
    target.eulerAngles = new Vector3(0, target.eulerAngles.y, 0);
    movement = target.TransformDirection(movement);
    target.rotation = tmp;

    transform.rotation = Quaternion.LookRotation(movement);

    movement = Vector3.ClampMagnitude(movement, moveSpeed);
    movement *= Time.deltaTime;

    controller.Move(movement);
  }
}