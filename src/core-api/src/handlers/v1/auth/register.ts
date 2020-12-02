import { Static, Type } from '@sinclair/typebox'
import { RouteHandler } from 'fastify'
import { nanoid as uniqueId } from 'nanoid'
import { hash } from 'argon2'
import { PrismaClientKnownRequestError, User } from '@prisma/client'
import { V1ApiTypes as ApiTypes } from '@gmcsh/shared'
import { handleValidationError } from 'utils/handle-validation-error'
import { db } from 'utils/db'

const registerBody = Type.Object({
  username: Type.String({ minLength: 1, maxLength: 255 }),
  email: Type.String({ minLength: 1, maxLength: 255, format: 'email' }),
  password: Type.String({
    minLength: 6,
    maxLength: 255,
  }),
})

const register: RouteHandler<{
  Body: Static<typeof registerBody>
  Reply: ApiTypes.ErrorResponse | ApiTypes.RegisterResponse
}> = async (request, reply): Promise<void> => {
  // Validate request body
  if (request.validationError) {
    reply.log.error(request.validationError.validation)
    const errors = handleValidationError(request.validationError.validation)
    reply.status(422).send({
      message: 'Validation failed',
      info: {
        errors,
      },
    })
    return
  }

  const { email, username, password } = request.body
  const hashedPassword = await hash(password)
  let user: Omit<User, 'password'>

  try {
    user = await db.user.create({
      data: {
        id: `u-${uniqueId()}`,
        email,
        password: hashedPassword,
        username,
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
      },
    })
  } catch (error) {
    reply.log.error(error)

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const { target } = error?.meta as { target: string[] }
        reply.status(409).send({
          message: `Taken ${target.join(', ')}.`,
          info: {
            ...error,
          },
        })
        return
      }
    }

    reply.status(500).send({
      message: 'Server error',
      info: {
        ...error,
      },
    })
    return
  }

  const safeUser = {
    id: user.id,
    username: user.username,
    createdAt: user.createdAt,
    email: user.email,
  }

  request.session.set('data', {
    user: {
      ...safeUser,
    },
    createdAt: new Date().toISOString(),
  })

  reply.send({
    user: {
      ...safeUser,
    },
  })
}

export { register, registerBody }
