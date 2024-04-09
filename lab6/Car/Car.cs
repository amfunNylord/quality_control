namespace CarNS
{
    public enum Direction
    {
        BACKWARD = -1,
        STANDING,
        FORWARD
    }

    public class Car
    {
        private const int GEAR_R = -1;
        private const int GEAR_N = 0;
        private const int GEAR_1 = 1;
        private const int GEAR_2 = 2;
        private const int GEAR_3 = 3;
        private const int GEAR_4 = 4;
        private const int GEAR_5 = 5;

        private const int GEAR_R_MIN_SPEED = 0;
        private const int GEAR_R_MAX_SPEED = 20;
        private const int GEAR_N_MIN_SPEED = 0;
        private const int GEAR_N_MAX_SPEED = 150;
        private const int GEAR_1_MIN_SPEED = 0;
        private const int GEAR_1_MAX_SPEED = 30;
        private const int GEAR_2_MIN_SPEED = 20;
        private const int GEAR_2_MAX_SPEED = 50;
        private const int GEAR_3_MIN_SPEED = 30;
        private const int GEAR_3_MAX_SPEED = 60;
        private const int GEAR_4_MIN_SPEED = 40;
        private const int GEAR_4_MAX_SPEED = 90;
        private const int GEAR_5_MIN_SPEED = 50;
        private const int GEAR_5_MAX_SPEED = 150;

        private const bool ENGINE_ON = true;
        private const bool ENGINE_OFF = false;

        private bool m_engineStatus = ENGINE_OFF;
        private int m_speed = GEAR_N_MIN_SPEED;
        private int m_gear = GEAR_N;

        private readonly Dictionary<int, Tuple<int, int>> gearSpeedRange = new Dictionary<int, Tuple<int, int>>()
    {
        { GEAR_R, new Tuple<int, int>(GEAR_R_MIN_SPEED, GEAR_R_MAX_SPEED) },
        { GEAR_N, new Tuple<int, int>(GEAR_N_MIN_SPEED, GEAR_N_MAX_SPEED) },
        { GEAR_1, new Tuple<int, int>(GEAR_1_MIN_SPEED, GEAR_1_MAX_SPEED) },
        { GEAR_2, new Tuple<int, int>(GEAR_2_MIN_SPEED, GEAR_2_MAX_SPEED) },
        { GEAR_3, new Tuple<int, int>(GEAR_3_MIN_SPEED, GEAR_3_MAX_SPEED) },
        { GEAR_4, new Tuple<int, int>(GEAR_4_MIN_SPEED, GEAR_4_MAX_SPEED) },
        { GEAR_5, new Tuple<int, int>(GEAR_5_MIN_SPEED, GEAR_5_MAX_SPEED) }
    };

        public bool IsSwitchedOnEngine()
        {
            return m_engineStatus;
        }

        public Direction GetDirection()
        {
            if (m_speed > 0)
            {
                return Direction.FORWARD;
            }
            else if (m_speed == 0)
            {
                return Direction.STANDING;
            }
            else
            {
                return Direction.BACKWARD;
            }
        }

        public int GetGear()
        {
            return m_gear;
        }

        public int GetSpeed()
        {
            return m_speed;
        }

        public bool SwitchOnEngine()
        {
            if (m_engineStatus == ENGINE_ON)
            {
                Console.WriteLine("The car's engine is already switched on");
            }
            else
            {
                m_engineStatus = ENGINE_ON;
                m_gear = GEAR_N;
            }
            return m_engineStatus;
        }

        public bool SwitchOffEngine()
        {
            if (m_engineStatus != ENGINE_OFF)
            {
                if (m_speed == GEAR_N_MIN_SPEED && m_gear == GEAR_N)
                {
                    m_engineStatus = ENGINE_OFF;
                }
            }
            return m_engineStatus;
        }

        public bool SetGear(int gear)
        {
            if (m_engineStatus == ENGINE_OFF)
            {
                Console.WriteLine("You can't set gear because your engine is off");
                return false;
            }
            if (gear == GEAR_R)
            {
                if (m_gear == gear)
                {
                    return true;
                }
                if (m_speed != 0)
                {
                    Console.WriteLine("You can't set R gear because your speed isn't zero");
                    return false;
                }
            }
            if (gear > GEAR_N && (m_gear == GEAR_R || m_gear == GEAR_N))
            {
                if (m_speed != 0)
                {
                    Console.WriteLine("You can set this gear after stopping");
                    return false;
                }
            }
            if ((Math.Abs(m_speed) >= gearSpeedRange[gear].Item1) && (Math.Abs(m_speed) <= gearSpeedRange[gear].Item2))
            {
                m_gear = gear;
                return true;
            }
            Console.WriteLine("You don't have needed speed for this gear");
            return false;
        }

        public bool SetSpeed(int speed)
        {
            if (m_gear == GEAR_N)
            {
                if (speed > Math.Abs(m_speed))
                {
                    return false;
                }
            }
            if ((speed >= gearSpeedRange[m_gear].Item1) && (speed <= gearSpeedRange[m_gear].Item2))
            {
                if (m_gear == GEAR_R)
                {
                    m_speed = -speed;
                }
                else
                {
                    m_speed = speed;
                }
                return true;
            }
            return false;
        }
        public static void Main(string[] args)
        {
        }
    }
}