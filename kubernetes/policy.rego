package authz

default allow = false

allow {
    input.method == "GET"
    input.path = ["users"]
}

allow {
    input.method == "POST"
    input.path = ["orders"]
}
