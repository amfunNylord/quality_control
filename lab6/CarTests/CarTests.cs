using CarNS;

namespace CarTests
{
    [TestClass]
    public class CarTests
    {
        [TestMethod]
        public void Get_Start_Values_Of_Car()
        {
            // Arrange
            Car car = new Car();

            // Act

            // Assert
            Assert.AreEqual(0, car.GetGear(), "Invalid start value of gear");
            Assert.AreEqual(0, car.GetSpeed(), "Invalid start value of speed");
            Assert.AreEqual(false, car.IsSwitchedOnEngine(), "Invalid start value of engine status");
            Assert.AreEqual(Direction.STANDING, car.GetDirection(), "Invalid start value of direction");
        }

        [TestMethod]
        public void Switching_Engine_On_When_Engine_Is_Off()
        {
            // Arrange
            Car car = new Car();

            // Act
            car.SwitchOnEngine();

            // Assert
            Assert.AreEqual(true, car.IsSwitchedOnEngine());
        }

        [TestMethod]
        public void Switching_Engine_On_When_Engine_Is_On()
        {
            // Arrange
            Car car = new Car();
            car.SwitchOnEngine();

            // Act
            car.SwitchOnEngine();

            // Assert
            Assert.AreEqual(true, car.IsSwitchedOnEngine());
        }

        [TestMethod]
        public void Switching_Engine_Off_When_Engine_Is_On()
        {
            // Arrange
            Car car = new Car();
            car.SwitchOnEngine();

            // Act
            car.SwitchOffEngine();

            // Assert
            Assert.AreEqual(false, car.IsSwitchedOnEngine());
        }

        [TestMethod]
        public void Switching_Engine_Off_When_Engine_Is_On_And_Gear_Isnot_N()
        {
            // Arrange
            Car car = new Car();
            car.SwitchOnEngine();
            car.SetGear(1);

            // Act
            car.SwitchOffEngine();

            // Assert
            Assert.AreEqual(true, car.IsSwitchedOnEngine());
        }

        [TestMethod]
        public void Switching_Engine_Off_When_Engine_Is_On_And_Speed_Isnot_Zero_And_Gear_Isnot_N()
        {
            // Arrange
            Car car = new Car();
            car.SwitchOnEngine();
            car.SetGear(1);
            car.SetSpeed(20);

            // Act
            car.SwitchOffEngine();

            // Assert
            Assert.AreEqual(true, car.IsSwitchedOnEngine());
        }

        [TestMethod]
        public void Set_Gear_R_When_Engine_Off()
        {
            // Arrange
            Car car = new Car();

            // Act
            car.SetGear(-1);

            // Assert
            Assert.AreEqual(0, car.GetGear());
        }

        [TestMethod]
        public void Set_Gear_1_When_Engine_On()
        {
            // Arrange
            Car car = new Car();
            car.SwitchOnEngine();

            // Act
            car.SetGear(1);

            // Assert
            Assert.AreEqual(1, car.GetGear());
        }

        [TestMethod]
        public void Set_Gear_2_When_Engine_On_And_Speed_Isnot_In_Interval_Of_2_Gear()
        {
            // Arrange
            Car car = new Car();
            car.SwitchOnEngine();

            // Act
            car.SetGear(2);

            // Assert
            Assert.AreEqual(0, car.GetGear());
        }

        [TestMethod]
        public void Set_Gear_R_When_Engine_On_And_Speed_Is_Zero()
        {
            // Arrange
            Car car = new Car();
            car.SwitchOnEngine();

            // Act
            car.SetGear(-1);

            // Assert
            Assert.AreEqual(-1, car.GetGear());
        }

        [TestMethod]
        public void Set_Gear_R_When_Engine_Off_And_Speed_Isnot_Zero()
        {
            // Arrange
            Car car = new Car();
            car.SwitchOnEngine();
            car.SetGear(-1);
            car.SetSpeed(20);
            car.SetGear(0);
            // Act
            car.SetGear(-1);

            // Assert
            Assert.AreEqual(0, car.GetGear());
        }

        [TestMethod]
        public void Set_Gear_1_From_R_Gear_When_Engine_On_And_Speed_Isnot_Zero()
        {
            // Arrange
            Car car = new Car();
            car.SwitchOnEngine();
            car.SetGear(-1);
            car.SetSpeed(20);

            // Act
            car.SetGear(1);

            // Assert
            Assert.AreEqual(-1, car.GetGear());
        }

        [TestMethod]
        public void Set_Gear_R_When_Engine_On_Speed_Zero_And_Gear_Already_R()
        {
            // Arrange
            Car car = new Car();
            car.SwitchOnEngine();
            car.SetGear(-1);
            // Act
            car.SetGear(-1);

            // Assert
            Assert.AreEqual(-1, car.GetGear());
        }


        [TestMethod]
        public void Set_Speed_When_Engin_Is_Off()
        {
            // Arrange
            Car car = new Car();

            // Act
            car.SetSpeed(20);

            // Assert
            Assert.AreEqual(0, car.GetSpeed());
        }

        [TestMethod]
        public void Set_Speed_When_Engin_Is_On_With_Zero_Gear()
        {
            // Arrange
            Car car = new Car();
            car.SwitchOnEngine();

            // Act
            car.SetSpeed(20);

            // Assert
            Assert.AreEqual(0, car.GetSpeed());
        }

        [TestMethod]
        public void Set_Speed_Which_In_Interval_Of_1_Gear_When_Engin_Is_On()
        {
            // Arrange
            Car car = new Car();
            car.SwitchOnEngine();
            car.SetGear(1);

            // Act
            car.SetSpeed(20);

            // Assert
            Assert.AreEqual(20, car.GetSpeed(), "Invalid set speed, must be 20");
            Assert.AreEqual(Direction.FORWARD, car.GetDirection(), "Invalid direction, must be FORWARD");
        }

        [TestMethod]
        public void Set_Speed_Which_Is_More_Than_Interval_Of_1_Gear_When_Engin_Is_On()
        {
            // Arrange
            Car car = new Car();
            car.SwitchOnEngine();
            car.SetGear(1);

            // Act
            car.SetSpeed(60);

            // Assert
            Assert.AreEqual(0, car.GetSpeed());
        }

        [TestMethod]
        public void Set_Speed_Which_Is_Less_Than_Interval_Of_1_Gear_When_Engin_Is_On()
        {
            // Arrange
            Car car = new Car();
            car.SwitchOnEngine();
            car.SetGear(1);

            // Act
            car.SetSpeed(-10);

            // Assert
            Assert.AreEqual(0, car.GetSpeed());
        }

        [TestMethod]
        public void Set_Speed_Which_In_Interval_Of_R_Gear_When_Engin_Is_On()
        {
            // Arrange
            Car car = new Car();
            car.SwitchOnEngine();
            car.SetGear(-1);

            // Act
            car.SetSpeed(10);

            // Assert
            Assert.AreEqual(-10, car.GetSpeed(), "Invalid speed, must be -10");
            Assert.AreEqual(Direction.BACKWARD, car.GetDirection(), "Invalid direction, must be BACKWARD");
            
        }

        [TestMethod]
        public void Set_Speed_Which_In_Interval_Of_N_Gear_When_Engin_Is_On()
        {
            // Arrange
            Car car = new Car();
            car.SwitchOnEngine();

            // Act
            car.SetSpeed(0);

            // Assert
            Assert.AreEqual(0, car.GetSpeed());

        }
    }
}