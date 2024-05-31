using Microsoft.AspNetCore.SignalR;

namespace ChatApp_SignalR.Hubs
{
    public class ChatHubs : Hub
    {
        private readonly string _botuser;

        private readonly IDictionary<string,UserConneection> _connetections;
        public ChatHubs(IDictionary<string, UserConneection> connetections)
        {
            _botuser = "Chat_Bot";
            _connetections = connetections;
        }


        public override Task OnDisconnectedAsync(Exception? exception)
        {
            if(_connetections.TryGetValue(Context.ConnectionId,out UserConneection UserConneection))
            {
                _connetections.Remove(Context.ConnectionId);
                Clients.Group(UserConneection.Room).SendAsync("ReceiveMessage", _botuser, $"{UserConneection.User} has left");
                SendConnectedUsers(UserConneection.Room);

            }
            return base.OnDisconnectedAsync(exception);

        }


        public async Task SendMessage (string message)
        {
            if(_connetections.TryGetValue(Context.ConnectionId, out UserConneection UserConneection))
            {
                await Clients.Group(UserConneection.Room).SendAsync("ReceiveMessage", UserConneection.User, message);
            }
        }


        public async Task JoinRoom(UserConneection userConnetection)
        {

            await Groups.AddToGroupAsync(Context.ConnectionId, userConnetection.Room);
            _connetections[Context.ConnectionId]=userConnetection;
            await Clients.Groups(userConnetection.Room).SendAsync("RecieveMessage",_botuser,
            $"{userConnetection.User}has joined {userConnetection.Room}");

            await SendConnectedUsers(userConnetection.Room);

        }

        public Task SendConnectedUsers (string room)
        {
            var users = _connetections.Values.Where(R=>R.Room==room).Select(U=>U.User);
            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }

    }
}

