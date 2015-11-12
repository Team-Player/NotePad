using Notes.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Notes.Domain.Abstract
{
    public interface IUserRepository
    {
        IEnumerable<User> Users { get; }
    }
}
